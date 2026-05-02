"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBusiness = void 0;
const Business_js_1 = __importDefault(require("../../../models/Business.js"));
const cloudinary_js_1 = __importDefault(require("../../../config/cloudinary.js"));
const createBusiness = async (_, { name, location, category, priceCategory, phone, email, latitude, longitude, heroImage, galleryImages, description, faq, isOpen, openingTime, closingTime, }) => {
    try {
        if (!["cheap", "moderate", "expensive"].includes(priceCategory)) {
            throw new Error("Invalid price category");
        }
        let heroImageUrl;
        let heroImagePublicId;
        const galleryImageUrls = [];
        const galleryImagePublicIds = [];
        if (heroImage) {
            const result = await cloudinary_js_1.default.uploader.upload(heroImage, {
                folder: "goa-yellow-pages/hero",
            });
            heroImageUrl = result.secure_url;
            heroImagePublicId = result.public_id;
        }
        if (galleryImages && galleryImages.length > 0) {
            for (const image of galleryImages) {
                const result = await cloudinary_js_1.default.uploader.upload(image, {
                    folder: "goa-yellow-pages/gallery",
                });
                galleryImageUrls.push(result.secure_url);
                galleryImagePublicIds.push(result.public_id);
            }
        }
        const business = new Business_js_1.default({
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
    }
    catch (error) {
        console.error("Error creating business:", { error });
        throw new Error("Failed to create business");
    }
};
exports.createBusiness = createBusiness;
//# sourceMappingURL=createBusiness.js.map