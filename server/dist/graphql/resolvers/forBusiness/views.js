"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementPublicView = void 0;
const Business_js_1 = __importDefault(require("../../../models/Business.js"));
const incrementPublicView = async (_, { businessId, date }) => {
    const d = date || new Date().toISOString().slice(0, 10);
    const update = {
        $inc: {
            publicViews: 1,
            [`publicViewsByDate.${d}`]: 1,
        },
    };
    const business = await Business_js_1.default.findByIdAndUpdate(businessId, update, {
        new: true,
    }).lean();
    if (!business)
        throw new Error("Business not found");
    const result = { ...business, id: String(business._id) };
    if (result.publicViewsByDate instanceof Map) {
        result.publicViewsByDate = Object.fromEntries(Array.from(result.publicViewsByDate.entries()));
    }
    return result;
};
exports.incrementPublicView = incrementPublicView;
//# sourceMappingURL=views.js.map