export declare const addRating: (_: any, { businessId, userId, rating, comment, }: {
    businessId: string;
    userId: string;
    rating: number;
    comment?: string;
}) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business").IBusiness> & import("../../../models/Business").IBusiness & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const updateRating: (_: any, { businessId, userId, rating, comment, }: {
    businessId: string;
    userId: string;
    rating: number;
    comment?: string;
}) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business").IBusiness> & import("../../../models/Business").IBusiness & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const deleteRating: (_: any, { businessId, userId }: {
    businessId: string;
    userId: string;
}) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business").IBusiness> & import("../../../models/Business").IBusiness & {
    _id: import("mongoose").Types.ObjectId;
}>;
