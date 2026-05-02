export declare const getBusinesses: () => Promise<(import("mongoose").Document<unknown, {}, import("../../../models/Business").IBusiness> & import("../../../models/Business").IBusiness & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const getBusiness: (_: any, { id }: {
    id: string;
}) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business").IBusiness> & import("../../../models/Business").IBusiness & {
    _id: import("mongoose").Types.ObjectId;
}>;
