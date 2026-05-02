export declare const createContact: (_: any, { name, email, phone, address, latitude, longitude, googleMapsUrl, website, description, businessHours, socialMedia, }: {
    name: string;
    email: string;
    phone: string;
    address: string;
    latitude: number;
    longitude: number;
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
}) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Contact.js").IContact> & import("../../../models/Contact.js").IContact & {
    _id: import("mongoose").Types.ObjectId;
}>;
