"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFAQ = exports.updateFAQ = exports.addFAQ = void 0;
const Business_js_1 = __importDefault(require("../../../models/Business.js"));
const addFAQ = async (_, { businessId, question, answer }) => {
    try {
        const business = await Business_js_1.default.findById(businessId);
        if (!business) {
            throw new Error("Business not found");
        }
        business.faq.push({ question, answer });
        await business.save();
        return business;
    }
    catch (error) {
        throw new Error(`Failed to add FAQ: ${error}`);
    }
};
exports.addFAQ = addFAQ;
const updateFAQ = async (_, { businessId, faqIndex, question, answer }) => {
    try {
        const business = await Business_js_1.default.findById(businessId);
        if (!business) {
            throw new Error("Business not found");
        }
        if (faqIndex < 0 || faqIndex >= business.faq.length) {
            throw new Error("FAQ index out of bounds");
        }
        business.faq[faqIndex] = { question, answer };
        await business.save();
        return business;
    }
    catch (error) {
        throw new Error(`Failed to update FAQ: ${error}`);
    }
};
exports.updateFAQ = updateFAQ;
const deleteFAQ = async (_, { businessId, faqIndex }) => {
    try {
        const business = await Business_js_1.default.findById(businessId);
        if (!business) {
            throw new Error("Business not found");
        }
        if (faqIndex < 0 || faqIndex >= business.faq.length) {
            throw new Error("FAQ index out of bounds");
        }
        business.faq.splice(faqIndex, 1);
        await business.save();
        return business;
    }
    catch (error) {
        throw new Error(`Failed to delete FAQ: ${error}`);
    }
};
exports.deleteFAQ = deleteFAQ;
//# sourceMappingURL=faqOperations.js.map