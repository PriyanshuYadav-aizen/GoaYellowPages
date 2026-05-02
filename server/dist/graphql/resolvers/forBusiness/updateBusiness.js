"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBusiness = void 0;
const Business_js_1 = __importDefault(require("../../../models/Business.js"));
const cloudinary_js_1 = __importDefault(require("../../../config/cloudinary.js"));
const updateBusiness = async (_, { id, name, location, category, priceCategory, phone, email, latitude, longitude, heroImage, galleryImages, description, faq, isOpen, openingTime, closingTime, }) => {
    try {
        const existingBusiness = await Business_js_1.default.findById(id);
        if (!existingBusiness) {
            throw new Error("Business not found");
        }
        if (priceCategory &&
            !["cheap", "moderate", "expensive"].includes(priceCategory)) {
            throw new Error("Invalid price category");
        }
        const updateData = {
            name,
            location,
            category,
            priceCategory,
            phone,
            email,
            latitude,
            longitude,
            description,
            faq,
        };
        if (typeof isOpen === "boolean") {
            updateData.isOpen = isOpen;
        }
        if (typeof openingTime === "string") {
            updateData.openingTime = openingTime;
        }
        if (typeof closingTime === "string") {
            updateData.closingTime = closingTime;
        }
        if (heroImage) {
            if (heroImage.startsWith("data:image")) {
                if (existingBusiness.heroImagePublicId) {
                    await cloudinary_js_1.default.uploader.destroy(existingBusiness.heroImagePublicId);
                }
                const result = await cloudinary_js_1.default.uploader.upload(heroImage, {
                    folder: "goa-yellow-pages/hero",
                });
                updateData.heroImageUrl = result.secure_url;
                updateData.heroImagePublicId = result.public_id;
            }
            else {
                updateData.heroImageUrl = heroImage;
            }
        }
        else {
            if (existingBusiness.heroImagePublicId) {
                await cloudinary_js_1.default.uploader.destroy(existingBusiness.heroImagePublicId);
            }
            updateData.heroImageUrl = null;
            updateData.heroImagePublicId = null;
        }
        if (galleryImages) {
            const oldPublicIds = existingBusiness.galleryImagePublicIds || [];
            const newImageUrls = galleryImages.filter((img) => img.startsWith("http"));
            const oldImagesToKeep = existingBusiness.galleryImages.filter((img) => newImageUrls.includes(img));
            const publicIdsToDelete = oldPublicIds.filter((id, index) => !oldImagesToKeep.includes(existingBusiness.galleryImages[index]));
            if (publicIdsToDelete.length > 0) {
                for (const publicId of publicIdsToDelete) {
                    await cloudinary_js_1.default.uploader.destroy(publicId);
                }
            }
            const newBase64Images = galleryImages.filter((img) => img.startsWith("data:image"));
            const uploadedImages = [];
            if (newBase64Images.length > 0) {
                for (const image of newBase64Images) {
                    const result = await cloudinary_js_1.default.uploader.upload(image, {
                        folder: "goa-yellow-pages/gallery",
                    });
                    uploadedImages.push({
                        url: result.secure_url,
                        publicId: result.public_id,
                    });
                }
            }
            const finalImageUrls = [
                ...newImageUrls,
                ...uploadedImages.map((img) => img.url),
            ];
            const finalPublicIds = [
                ...existingBusiness.galleryImagePublicIds.filter((id, index) => oldImagesToKeep.includes(existingBusiness.galleryImages[index])),
                ...uploadedImages.map((img) => img.publicId),
            ];
            updateData.galleryImages = finalImageUrls;
            updateData.galleryImagePublicIds = finalPublicIds;
        }
        const updatedBusiness = await Business_js_1.default.findByIdAndUpdate(id, updateData, {
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