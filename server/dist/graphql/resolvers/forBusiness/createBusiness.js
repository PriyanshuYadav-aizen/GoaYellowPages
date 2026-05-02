"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBusiness = void 0;
const Business_1 = __importDefault(require("../../../models/Business"));
const createBusiness = async (_, { name, location, priceCategory, contactInfo, googleMapsUrl, heroImageUrl, galleryImages, description, }) => {
    try {
        if (!["cheap", "moderate", "expensive"].includes(priceCategory)) {
            throw new Error("Invalid price category");
        }
        const business = new Business_1.default({
            name,
            location,
            priceCategory,
            contactInfo,
            googleMapsUrl,
            heroImageUrl: heroImageUrl || undefined,
            galleryImages: galleryImages || [],
            description,
        });
        const savedBusiness = await business.save();
        return savedBusiness;
    }
    catch (error) {
        console.error("Error creating business:", error);
        throw new Error("Failed to create business");
    }
};
exports.createBusiness = createBusiness;
//# sourceMappingURL=createBusiness.js.map