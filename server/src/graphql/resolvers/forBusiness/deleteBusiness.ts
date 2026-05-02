import Business from "../../../models/Business";
import cloudinary from "../../../config/cloudinary";

export const deleteBusiness = async (_: any, { id }: { id: string }) => {
  try {
    const business = await Business.findById(id);
    if (!business) {
      throw new Error("Business not found");
    }

    // Delete hero image from Cloudinary
    if (business.heroImagePublicId) {
      await cloudinary.uploader.destroy(business.heroImagePublicId);
    }

    // Delete all gallery images from Cloudinary
    if (
      business.galleryImagePublicIds &&
      business.galleryImagePublicIds.length > 0
    ) {
      for (const publicId of business.galleryImagePublicIds) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Delete the business from database
    await Business.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.error("Error deleting business:", error);
    throw new Error("Failed to delete business");
  }
};
