"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBusiness = void 0;
const Business_1 = __importDefault(require("../../../models/Business"));
const fileUpload_1 = require("../../../utils/fileUpload");
const deleteBusiness = async (_, { id }) => {
    try {
        const business = await Business_1.default.findById(id);
        if (!business) {
            throw new Error("Business not found");
        }
        if (business.heroImageUrl) {
            const heroFilename = (0, fileUpload_1.getFilenameFromUrl)(business.heroImageUrl);
            (0, fileUpload_1.deleteFile)(heroFilename);
        }
        if (business.galleryImages && business.galleryImages.length > 0) {
            business.galleryImages.forEach((imageUrl) => {
                const filename = (0, fileUpload_1.getFilenameFromUrl)(imageUrl);
                (0, fileUpload_1.deleteFile)(filename);
            });
        }
        await Business_1.default.findByIdAndDelete(id);
        return true;
    }
    catch (error) {
        console.error("Error deleting business:", error);
        throw new Error("Failed to delete business");
    }
};
exports.deleteBusiness = deleteBusiness;
//# sourceMappingURL=deleteBusiness.js.map