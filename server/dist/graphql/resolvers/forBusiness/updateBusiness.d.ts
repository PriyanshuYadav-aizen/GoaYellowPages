export declare const updateBusiness: (_: any, { id, name, location, priceCategory, contactInfo, googleMapsUrl, heroImageUrl, galleryImages, description, }: {
    id: string;
    name?: string;
    location?: string;
    priceCategory?: string;
    contactInfo?: string;
    googleMapsUrl?: string;
    heroImageUrl?: string;
    galleryImages?: string[];
    description?: string;
}) => Promise<(import("mongoose").Document<unknown, {}, import("../../../models/Business").IBusiness> & import("../../../models/Business").IBusiness & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
