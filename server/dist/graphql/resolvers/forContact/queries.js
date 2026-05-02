"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContact = exports.getContacts = void 0;
const Contact_js_1 = __importDefault(require("../../../models/Contact.js"));
const getContacts = async () => {
    try {
        const contacts = await Contact_js_1.default.find().sort({ createdAt: -1 });
        return contacts;
    }
    catch (error) {
        console.error("Error fetching contacts:", error);
        throw new Error("Failed to fetch contacts");
    }
};
exports.getContacts = getContacts;
const getContact = async (_, { id }) => {
    try {
        const contact = await Contact_js_1.default.findById(id);
        if (!contact) {
            throw new Error("Contact not found");
        }
        return contact;
    }
    catch (error) {
        console.error("Error fetching contact:", error);
        throw new Error("Failed to fetch contact");
    }
};
exports.getContact = getContact;
//# sourceMappingURL=queries.js.map