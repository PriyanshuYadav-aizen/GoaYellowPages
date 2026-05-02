export declare const createContact: (_: any, { name, email, phone, address, googleMapsUrl, website, description, businessHours, socialMedia, }: {
    name: string;
    email: string;
    phone: string;
    address: string;
    googleMapsUrl: string;
    website: string;
    description: string;
    businessHours: string;
    socialMedia?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
    };
}) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Contact").IContact> & import("../../../models/Contact").IContact & {
    _id: import("mongoose").Types.ObjectId;
}>;
