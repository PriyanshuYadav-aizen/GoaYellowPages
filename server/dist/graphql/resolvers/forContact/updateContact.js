"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContact = void 0;
const Contact_1 = __importDefault(require("../../../models/Contact"));
const updateContact = async (_, { id, name, email, phone, address, googleMapsUrl, website, description, businessHours, socialMedia, }) => {
    try {
        const contact = await Contact_1.default.findById(id);
        if (!contact) {
            throw new Error("Contact not found");
        }
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Invalid email format");
            }
        }
        if (googleMapsUrl) {
            if (!googleMapsUrl.includes("maps.google.com") &&
                !googleMapsUrl.includes("goo.gl/maps")) {
                throw new Error("Invalid Google Maps URL");
            }
        }
        if (name)
            contact.name = name;
        if (email)
            contact.email = email;
        if (phone)
            contact.phone = phone;
        if (address)
            contact.address = address;
        if (googleMapsUrl)
            contact.googleMapsUrl = googleMapsUrl;
        if (website)
            contact.website = website;
        if (description)
            contact.description = description;
        if (businessHours)
            contact.businessHours = businessHours;
        if (socialMedia) {
            contact.socialMedia = {
                ...contact.socialMedia,
                ...socialMedia,
            };
        }
        await contact.save();
        return contact;
    }
    catch (error) {
        console.error("Error updating contact:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to update contact");
    }
};
exports.updateContact = updateContact;
//# sourceMappingURL=updateContact.js.map