import Business from "../../../models/Business.js";
import cloudinary from "../../../config/cloudinary.js";

export const createBusiness = async (
  _: any,
  {
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
    name: string;
    location: string;
    category: string;
    priceCategory: string;
    phone: string;
    email: string;
    latitude: number;
    longitude: number;
    heroImage?: string; // Expecting a base64 encoded string
    galleryImages?: string[]; // Expecting an array of base64 encoded strings
    description: string;
    faq?: Array<{ question: string; answer: string }>;
    isOpen?: boolean;
    openingTime?: string;
    closingTime?: string;
  }
) => {
  try {
    if (!["cheap", "moderate", "expensive"].includes(priceCategory)) {
      throw new Error("Invalid price category");
    }

    let heroImageUrl: string | undefined;
    let heroImagePublicId: string | undefined;
    const galleryImageUrls: string[] = [];
    const galleryImagePublicIds: string[] = [];

    // Upload hero image to Cloudinary if provided
    if (heroImage) {
      const result = await cloudinary.uploader.upload(heroImage, {
        folder: "goa-yellow-pages/hero",
      });
      heroImageUrl = result.secure_url;
      heroImagePublicId = result.public_id;
    }

    // Upload gallery images to Cloudinary if provided
    if (galleryImages && galleryImages.length > 0) {
      for (const image of galleryImages) {
        const result = await cloudinary.uploader.upload(image, {
          folder: "goa-yellow-pages/gallery",
        });
        galleryImageUrls.push(result.secure_url);
        galleryImagePublicIds.push(result.public_id);
      }
    }

    const business = new Business({
      name,
      location,
      category,
      priceCategory,
      phone,
      email,
      latitude,
      longitude,
      heroImageUrl,
      heroImagePublicId,
      galleryImages: galleryImageUrls,
      galleryImagePublicIds,
      description,
      faq: faq || [],
      isOpen: Boolean(isOpen),
      openingTime,
      closingTime,
    });

    const savedBusiness = await business.save();
    return savedBusiness;
  } catch (error) {
    console.error("Error creating business:", { error });
    throw new Error("Failed to create business");
  }
};
