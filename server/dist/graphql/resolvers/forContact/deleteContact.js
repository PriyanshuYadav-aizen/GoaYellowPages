"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = void 0;
const Contact_1 = __importDefault(require("../../../models/Contact"));
const deleteContact = async (_, { id }) => {
    try {
        const contact = await Contact_1.default.findById(id);
        if (!contact) {
            throw new Error("Contact not found");
        }
        await Contact_1.default.findByIdAndDelete(id);
        return true;
    }
    catch (error) {
        console.error("Error deleting contact:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to delete contact");
    }
};
exports.deleteContact = deleteContact;
//# sourceMappingURL=deleteContact.js.map