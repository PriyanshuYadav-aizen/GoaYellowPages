"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRating = exports.updateRating = exports.addRating = void 0;
const Business_js_1 = __importDefault(require("../../../models/Business.js"));
const addRating = async (_, { businessId, userId, rating, comment, }) => {
    try {
        if (rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5");
        }
        const business = await Business_js_1.default.findById(businessId);
        if (!business) {
            throw new Error("Business not found");
        }
        const existingRatingIndex = business.ratings.findIndex((r) => r.userId === userId);
        if (existingRatingIndex !== -1) {
            throw new Error("User has already rated this business. Use updateRating instead.");
        }
        business.ratings.push({
            userId,
            rating,
            comment,
            createdAt: new Date(),
        });
        await business.save();
        return business;
    }
    catch (error) {
        console.error("Error adding rating:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to add rating");
    }
};
exports.addRating = addRating;
const updateRating = async (_, { businessId, userId, rating, comment, }) => {
    try {
        if (rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5");
        }
        const business = await Business_js_1.default.findById(businessId);
        if (!business) {
            throw new Error("Business not found");
        }
        const existingRatingIndex = business.ratings.findIndex((r) => r.userId === userId);
        if (existingRatingIndex === -1) {
            throw new Error("User has not rated this business yet. Use addRating instead.");
        }
        business.ratings[existingRatingIndex] = {
            userId,
            rating,
            comment,
            createdAt: business.ratings[existingRatingIndex].createdAt,
        };
        await business.save();
        return business;
    }
    catch (error) {
        console.error("Error updating rating:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to update rating");
    }
};
exports.updateRating = updateRating;
const deleteRating = async (_, { businessId, userId }) => {
    try {
        const business = await Business_js_1.default.findById(businessId);
        if (!business) {
            throw new Error("Business not found");
        }
        const ratingIndex = business.ratings.findIndex((r) => r.userId === userId);
        if (ratingIndex === -1) {
            throw new Error("User has not rated this business");
        }
        business.ratings.splice(ratingIndex, 1);
        await business.save();
        return business;
    }
    catch (error) {
        console.error("Error deleting rating:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to delete rating");
    }
};
exports.deleteRating = deleteRating;
//# sourceMappingURL=ratingOperations.js.map