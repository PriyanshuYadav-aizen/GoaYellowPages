"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessResolvers = void 0;
const queries_js_1 = require("./queries.js");
const createBusiness_js_1 = require("./createBusiness.js");
const updateBusiness_js_1 = require("./updateBusiness.js");
const deleteBusiness_js_1 = require("./deleteBusiness.js");
const ratingOperations_js_1 = require("./ratingOperations.js");
const faqOperations_js_1 = require("./faqOperations.js");
const businessTypeResolvers_js_1 = require("./businessTypeResolvers.js");
const Business_js_1 = __importDefault(require("../../../models/Business.js"));
exports.businessResolvers = {
    Query: {
        getBusinesses: queries_js_1.getBusinesses,
        getBusiness: queries_js_1.getBusiness,
    },
    Mutation: {
        createBusiness: createBusiness_js_1.createBusiness,
        updateBusiness: updateBusiness_js_1.updateBusiness,
        deleteBusiness: deleteBusiness_js_1.deleteBusiness,
        addRating: ratingOperations_js_1.addRating,
        updateRating: ratingOperations_js_1.updateRating,
        deleteRating: ratingOperations_js_1.deleteRating,
        addFAQ: faqOperations_js_1.addFAQ,
        updateFAQ: faqOperations_js_1.updateFAQ,
        deleteFAQ: faqOperations_js_1.deleteFAQ,
        async incrementPublicView(_, { businessId, date }) {
            const d = date || new Date().toISOString().slice(0, 10);
            const update = {
                $inc: {
                    publicViews: 1,
                    [`publicViewsByDate.${d}`]: 1,
                },
            };
            const business = await Business_js_1.default.findByIdAndUpdate(businessId, update, { new: true }).lean();
            if (!business)
                throw new Error("Business not found");
            const result = { ...business, id: String(business._id) };
            if (result.publicViewsByDate instanceof Map) {
                result.publicViewsByDate = Object.fromEntries(Array.from(result.publicViewsByDate.entries()));
            }
            return result;
        },
    },
    Business: businessTypeResolvers_js_1.Business,
};
exports.default = exports.businessResolvers;
//# sourceMappingURL=index.js.map