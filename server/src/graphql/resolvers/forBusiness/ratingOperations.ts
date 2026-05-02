import Business from "../../../models/Business";

export const addRating = async (
  _: any,
  {
    businessId,
    userId,
    rating,
    comment,
  }: { businessId: string; userId: string; rating: number; comment?: string }
) => {
  try {
    // Validate rating range
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const business = await Business.findById(businessId);
    if (!business) {
      throw new Error("Business not found");
    }

    // Check if user has already rated this business
    const existingRatingIndex = business.ratings.findIndex(
      (r) => r.userId === userId
    );

    if (existingRatingIndex !== -1) {
      throw new Error(
        "User has already rated this business. Use updateRating instead."
      );
    }

    // Add new rating
    business.ratings.push({
      userId,
      rating,
      comment,
      createdAt: new Date(),
    });

    await business.save();
    return business;
  } catch (error) {
    console.error("Error adding rating:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to add rating"
    );
  }
};

export const updateRating = async (
  _: any,
  {
    businessId,
    userId,
    rating,
    comment,
  }: { businessId: string; userId: string; rating: number; comment?: string }
) => {
  try {
    // Validate rating range
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const business = await Business.findById(businessId);
    if (!business) {
      throw new Error("Business not found");
    }

    // Find existing rating
    const existingRatingIndex = business.ratings.findIndex(
      (r) => r.userId === userId
    );

    if (existingRatingIndex === -1) {
      throw new Error(
        "User has not rated this business yet. Use addRating instead."
      );
    }

    // Update existing rating
    business.ratings[existingRatingIndex] = {
      userId,
      rating,
      comment,
      createdAt: business.ratings[existingRatingIndex].createdAt, // Keep original creation date
    };

    await business.save();
    return business;
  } catch (error) {
    console.error("Error updating rating:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update rating"
    );
  }
};

export const deleteRating = async (
  _: any,
  { businessId, userId }: { businessId: string; userId: string }
) => {
  try {
    const business = await Business.findById(businessId);
    if (!business) {
      throw new Error("Business not found");
    }

    // Find and remove rating
    const ratingIndex = business.ratings.findIndex((r) => r.userId === userId);

    if (ratingIndex === -1) {
      throw new Error("User has not rated this business");
    }

    business.ratings.splice(ratingIndex, 1);
    await business.save();
    return business;
  } catch (error) {
    console.error("Error deleting rating:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete rating"
    );
  }
};
