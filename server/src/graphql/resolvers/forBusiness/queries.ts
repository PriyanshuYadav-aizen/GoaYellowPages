console.log("Loaded forBusiness/queries.ts");
import Business from "../../../models/Business.js";
// Redis caching removed

export const getBusinesses = async (
  _: any,
  { page = 1, limit = 9 }: { page?: number; limit?: number }
) => {
  try {
    // No cache layer

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count of businesses
    const totalBusinesses = await Business.countDocuments();

    // Get paginated businesses
    const businesses = await Business.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Ensure GraphQL-required id is present when using lean()
    const businessesWithId = businesses.map((b: any) => ({
      ...b,
      id: String(b._id),
    }));

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalBusinesses / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const payload = {
      businesses: businessesWithId,
      totalPages,
      currentPage: page,
      totalBusinesses,
      hasNextPage,
      hasPrevPage,
    };

    return payload;
  } catch (error) {
    console.error("Error fetching businesses:", error);
    throw new Error("Failed to fetch businesses");
  }
};

export const getBusiness = async (_: any, { id }: { id: string }) => {
  try {
    // No cache layer

    const businessDoc = await Business.findById(id).lean();
    if (!businessDoc) {
      throw new Error("Business not found");
    }

    const business = { ...businessDoc, id: String(businessDoc._id) } as any;
    // Normalize Map field to plain object for GraphQL JSON
    if (
      business.publicViewsByDate &&
      business.publicViewsByDate instanceof Map
    ) {
      business.publicViewsByDate = Object.fromEntries(
        Array.from(
          (business.publicViewsByDate as Map<string, number>).entries()
        )
      );
    }

    return business;
  } catch (error) {
    console.error("Error fetching business:", error);
    throw new Error("Failed to fetch business");
  }
};
