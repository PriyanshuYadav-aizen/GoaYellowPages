"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusiness = exports.getBusinesses = void 0;
const Business_1 = __importDefault(require("../../../models/Business"));
const getBusinesses = async () => {
    try {
        const businesses = await Business_1.default.find().sort({ createdAt: -1 });
        return businesses;
    }
    catch (error) {
        console.error("Error fetching businesses:", error);
        throw new Error("Failed to fetch businesses");
    }
};
exports.getBusinesses = getBusinesses;
const getBusiness = async (_, { id }) => {
    try {
        const business = await Business_1.default.findById(id);
        if (!business) {
            throw new Error("Business not found");
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