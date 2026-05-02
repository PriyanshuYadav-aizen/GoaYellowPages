export declare const updateBusiness: (_: any, { id, name, location, category, priceCategory, phone, email, latitude, longitude, heroImage, galleryImages, description, faq, isOpen, openingTime, closingTime, }: {
    id: string;
    name?: string;
    location?: string;
    category?: string;
    priceCategory?: string;
    phone?: string;
    email?: string;
    latitude?: number;
    longitude?: number;
    heroImage?: string;
    galleryImages?: string[];
    description?: string;
    faq?: Array<{
        question: string;
        answer: string;
    }>;
    isOpen?: boolean;
    openingTime?: string;
    closingTime?: string;
}) => Promise<(import("mongoose").Document<unknown, {}, import("../../../models/Business.js").IBusiness> & import("../../../models/Business.js").IBusiness & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
