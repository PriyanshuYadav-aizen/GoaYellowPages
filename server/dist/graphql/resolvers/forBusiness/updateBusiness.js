"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBusiness = void 0;
const Business_1 = __importDefault(require("../../../models/Business"));
const fileUpload_1 = require("../../../utils/fileUpload");
const updateBusiness = async (_, { id, name, location, priceCategory, contactInfo, googleMapsUrl, heroImageUrl, galleryImages, description, }) => {
    try {
        const existingBusiness = await Business_1.default.findById(id);
        if (!existingBusiness) {
            throw new Error("Business not found");
        }
        if (priceCategory &&
            !["cheap", "moderate", "expensive"].includes(priceCategory)) {
            throw new Error("Invalid price category");
        }
        if (heroImageUrl !== undefined && existingBusiness.heroImageUrl) {
            const oldFilename = (0, fileUpload_1.getFilenameFromUrl)(existingBusiness.heroImageUrl);
            (0, fileUpload_1.deleteFile)(oldFilename);
        }
        if (galleryImages !== undefined &&
            existingBusiness.galleryImages.length > 0) {
            existingBusiness.galleryImages.forEach((imageUrl) => {
                const oldFilename = (0, fileUpload_1.getFilenameFromUrl)(imageUrl);
                (0, fileUpload_1.deleteFile)(oldFilename);
            });
        }
        const updateData = {};
        if (name)
            updateData.name = name;
        if (location)
            updateData.location = location;
        if (priceCategory)
            updateData.priceCategory = priceCategory;
        if (contactInfo)
            updateData.contactInfo = contactInfo;
        if (googleMapsUrl)
            updateData.googleMapsUrl = googleMapsUrl;
        if (heroImageUrl !== undefined)
            updateData.heroImageUrl = heroImageUrl;
        if (galleryImages !== undefined)
            updateData.galleryImages = galleryImages;
        if (description)
            updateData.description = description;
        const updatedBusiness = await Business_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        return updatedBusiness;
    }
    catch (error) {
        console.error("Error updating business:", error);
        throw new Error("Failed to update business");
    }
};
exports.updateBusiness = updateBusiness;
//# sourceMappingURL=updateBusiness.js.map