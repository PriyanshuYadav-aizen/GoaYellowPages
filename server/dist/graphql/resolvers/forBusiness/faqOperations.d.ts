export declare const addFAQ: (_: any, { businessId, question, answer }: any) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business.js").IBusiness> & import("../../../models/Business.js").IBusiness & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const updateFAQ: (_: any, { businessId, faqIndex, question, answer }: any) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business.js").IBusiness> & import("../../../models/Business.js").IBusiness & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const deleteFAQ: (_: any, { businessId, faqIndex }: any) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business.js").IBusiness> & import("../../../models/Business.js").IBusiness & {
    _id: import("mongoose").Types.ObjectId;
}>;
