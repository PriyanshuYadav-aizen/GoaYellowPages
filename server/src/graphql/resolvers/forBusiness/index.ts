// Import all business operations
import { getBusinesses, getBusiness } from "./queries";
import { createBusiness } from "./createBusiness";
import { updateBusiness } from "./updateBusiness";
import { deleteBusiness } from "./deleteBusiness";
import { addRating, updateRating, deleteRating } from "./ratingOperations";
import { addFAQ, updateFAQ, deleteFAQ } from "./faqOperations";
import { Business } from "./businessTypeResolvers";
import BusinessModel from "../../../models/Business";

// Export all business resolvers
export const businessResolvers = {
  Query: {
    getBusinesses,
    getBusiness,
  },
  Mutation: {
    createBusiness,
    updateBusiness,
    deleteBusiness,
    addRating,
    updateRating,
    deleteRating,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    async incrementPublicView(
      _: any,
      { businessId, date }: { businessId: string; date?: string }
    ) {
      const d = date || new Date().toISOString().slice(0, 10);
      const update: any = {
        $inc: {
          publicViews: 1,
          [`publicViewsByDate.${d}`]: 1,
        },
      };
      const business = await BusinessModel.findByIdAndUpdate(
        businessId,
        update,
        { new: true }
      ).lean();
      if (!business) throw new Error("Business not found");
      const result: any = { ...business, id: String((business as any)._id) };
      if (result.publicViewsByDate instanceof Map) {
        result.publicViewsByDate = Object.fromEntries(
          Array.from(
            (result.publicViewsByDate as Map<string, number>).entries()
          )
        );
      }
      return result;
    },
  },
  Business,
};

export default businessResolvers;
