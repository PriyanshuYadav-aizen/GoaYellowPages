import Business from "../../../models/Business";
import cloudinary from "../../../config/cloudinary";

export const updateBusiness = async (
  _: any,
  {
    id,
    name,
    location,
    category,
    priceCategory,
    phone,
    email,
    latitude,
    longitude,
    heroImage, // Changed from heroImageUrl
    galleryImages,
    description,
    faq,
    isOpen,
    openingTime,
    closingTime,
  }: {
    id: string;
    name?: string;
    location?: string;
    category?: string;
    priceCategory?: string;
    phone?: string;
    email?: string;
    latitude?: number;
    longitude?: number;
    heroImage?: string; // Expecting a base64 encoded string or a URL
    galleryImages?: string[]; // Expecting an array of base64 encoded strings or URLs
    description?: string;
    faq?: Array<{ question: string; answer: string }>;
    isOpen?: boolean;
    openingTime?: string;
    closingTime?: string;
  }
) => {
  try {
    const existingBusiness = await Business.findById(id);
    if (!existingBusiness) {
      throw new Error("Business not found");
    }

    if (
      priceCategory &&
      !["cheap", "moderate", "expensive"].includes(priceCategory)
    ) {
      throw new Error("Invalid price category");
    }

    const updateData: any = {
      name,
      location,
      category,
      priceCategory,
      phone,
      email,
      latitude,
      longitude,
      description,
      faq,
    };

    if (typeof isOpen === "boolean") {
      updateData.isOpen = isOpen;
    }
    if (typeof openingTime === "string") {
      updateData.openingTime = openingTime;
    }
    if (typeof closingTime === "string") {
      updateData.closingTime = closingTime;
    }

    // Handle hero image update
    if (heroImage) {
      if (heroImage.startsWith("data:image")) {
        // This is a new base64 image, upload it
        if (existingBusiness.heroImagePublicId) {
          await cloudinary.uploader.destroy(existingBusiness.heroImagePublicId);
        }
        const result = await cloudinary.uploader.upload(heroImage, {
          folder: "goa-yellow-pages/hero",
        });
        updateData.heroImageUrl = result.secure_url;
        updateData.heroImagePublicId = result.public_id;
      } else {
        // This is an existing URL, keep it
        updateData.heroImageUrl = heroImage;
      }
    } else {
      // heroImage is null or undefined, so delete it
      if (existingBusiness.heroImagePublicId) {
        await cloudinary.uploader.destroy(existingBusiness.heroImagePublicId);
      }
      updateData.heroImageUrl = null;
      updateData.heroImagePublicId = null;
    }

    // Handle gallery images update
    if (galleryImages) {
      // Delete old gallery images that are no longer in the list
      const oldPublicIds = existingBusiness.galleryImagePublicIds || [];
      const newImageUrls = galleryImages.filter((img) =>
        img.startsWith("http")
      );
      const oldImagesToKeep = existingBusiness.galleryImages.filter((img) =>
        newImageUrls.includes(img)
      );
      const publicIdsToDelete = oldPublicIds.filter(
        (id, index) =>
          !oldImagesToKeep.includes(existingBusiness.galleryImages[index])
      );

      if (publicIdsToDelete.length > 0) {
        for (const publicId of publicIdsToDelete) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      // Upload new gallery images
      const newBase64Images = galleryImages.filter((img) =>
        img.startsWith("data:image")
      );
      const uploadedImages = [];
      if (newBase64Images.length > 0) {
        for (const image of newBase64Images) {
          const result = await cloudinary.uploader.upload(image, {
            folder: "goa-yellow-pages/gallery",
          });
          uploadedImages.push({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      }

      const finalImageUrls = [
        ...newImageUrls,
        ...uploadedImages.map((img) => img.url),
      ];
      const finalPublicIds = [
        ...existingBusiness.galleryImagePublicIds.filter((id, index) =>
          oldImagesToKeep.includes(existingBusiness.galleryImages[index])
        ),
        ...uploadedImages.map((img) => img.publicId),
      ];

      updateData.galleryImages = finalImageUrls;
      updateData.galleryImagePublicIds = finalPublicIds;
    }

    const updatedBusiness = await Business.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedBusiness;
  } catch (error) {
    console.error("Error updating business:", error);
    throw new Error("Failed to update business");
  }
};
