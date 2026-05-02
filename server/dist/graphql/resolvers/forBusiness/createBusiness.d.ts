export declare const createBusiness: (_: any, { name, location, priceCategory, contactInfo, googleMapsUrl, heroImageUrl, galleryImages, description, }: {
    name: string;
    location: string;
    priceCategory: string;
    contactInfo: string;
    googleMapsUrl: string;
    heroImageUrl?: string;
    galleryImages?: string[];
    description: string;
}) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business").IBusiness> & import("../../../models/Business").IBusiness & {
    _id: import("mongoose").Types.ObjectId;
}>;
