"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContact = void 0;
const Contact_js_1 = __importDefault(require("../../../models/Contact.js"));
const createContact = async (_, { name, email, phone, address, latitude, longitude, googleMapsUrl, website, description, businessHours, socialMedia, }) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }
        if (latitude < -90 || latitude > 90) {
            throw new Error("Latitude must be between -90 and 90");
        }
        if (longitude < -180 || longitude > 180) {
            throw new Error("Longitude must be between -180 and 180");
        }
        const contact = new Contact_js_1.default({
            name,
            email,
            phone,
            address,
            latitude,
            longitude,
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