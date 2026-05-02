"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusiness = exports.getBusinesses = void 0;
console.log("Loaded forBusiness/queries.ts");
const Business_js_1 = __importDefault(require("../../../models/Business.js"));
const getBusinesses = async (_, { page = 1, limit = 9 }) => {
    try {
        const skip = (page - 1) * limit;
        const totalBusinesses = await Business_js_1.default.countDocuments();
        const businesses = await Business_js_1.default.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        const businessesWithId = businesses.map((b) => ({
            ...b,
            id: String(b._id),
        }));
        const totalPages = Math.ceil(totalBusinesses / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const payload = {
            businesses: businessesWithId,
            totalPages,
            currentPage: page,
            totalBusinesses,
            hasNextPage,
            hasPrevPage,
        };
        return payload;
    }
    catch (error) {
        console.error("Error fetching businesses:", error);
        throw new Error("Failed to fetch businesses");
    }
};
exports.getBusinesses = getBusinesses;
const getBusiness = async (_, { id }) => {
    try {
        const businessDoc = await Business_js_1.default.findById(id).lean();
        if (!businessDoc) {
            throw new Error("Business not found");
        }
        const business = { ...businessDoc, id: String(businessDoc._id) };
        if (business.publicViewsByDate &&
            business.publicViewsByDate instanceof Map) {
            business.publicViewsByDate = Object.fromEntries(Array.from(business.publicViewsByDate.entries()));
        }
        return business;
    }
    catch (error) {
        console.error("Error fetching business:", error);
        throw new Error("Failed to fetch business");
    }
};
exports.getBusiness = getBusiness;
//# sourceMappingURL=queries.js.map