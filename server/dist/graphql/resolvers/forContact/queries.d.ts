export declare const getContacts: () => Promise<(import("mongoose").Document<unknown, {}, import("../../../models/Contact.js").IContact> & import("../../../models/Contact.js").IContact & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
export declare const getContact: (_: any, { id }: {
    id: string;
}) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Contact.js").IContact> & import("../../../models/Contact.js").IContact & {
    _id: import("mongoose").Types.ObjectId;
}>;
