"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContact = void 0;
const Contact_1 = __importDefault(require("../../../models/Contact"));
const createContact = async (_, { name, email, phone, address, googleMapsUrl, website, description, businessHours, socialMedia, }) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }
        if (!googleMapsUrl.includes("maps.google.com") &&
            !googleMapsUrl.includes("goo.gl/maps")) {
            throw new Error("Invalid Google Maps URL");
        }
        const contact = new Contact_1.default({
            name,
            email,
            phone,
            address,
            googleMapsUrl,
            website,
            description,
            businessHours,
            socialMedia: socialMedia || {},
        });
        await contact.save();
        return contact;
    }
    catch (error) {
        console.error("Error creating contact:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to create contact");
    }
};
exports.createContact = createContact;
//# sourceMappingURL=createContact.js.map