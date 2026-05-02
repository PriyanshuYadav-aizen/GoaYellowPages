"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBusiness = void 0;
const Business_js_1 = __importDefault(require("../../../models/Business.js"));
const cloudinary_js_1 = __importDefault(require("../../../config/cloudinary.js"));
const deleteBusiness = async (_, { id }) => {
    try {
        const business = await Business_js_1.default.findById(id);
        if (!business) {
            throw new Error("Business not found");
        }
        if (business.heroImagePublicId) {
            await cloudinary_js_1.default.uploader.destroy(business.heroImagePublicId);
        }
        if (business.galleryImagePublicIds &&
            business.galleryImagePublicIds.length > 0) {
            for (const publicId of business.galleryImagePublicIds) {
                await cloudinary_js_1.default.uploader.destroy(publicId);
            }
        }
        await Business_js_1.default.findByIdAndDelete(id);
        return true;
    }
    catch (error) {
        console.error("Error deleting business:", error);
        throw new Error("Failed to delete business");
    }
};
exports.deleteBusiness = deleteBusiness;
//# sourceMappingURL=deleteBusiness.js.map