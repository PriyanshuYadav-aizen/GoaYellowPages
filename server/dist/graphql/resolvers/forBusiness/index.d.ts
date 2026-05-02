export declare const businessResolvers: {
    Query: {
        getBusinesses: () => Promise<(import("mongoose").Document<unknown, {}, import("../../../models/Business").IBusiness> & import("../../../models/Business").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        getBusiness: (_: any, { id }: {
            id: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business").IBusiness> & import("../../../models/Business").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    };
    Mutation: {
        createBusiness: (_: any, { name, location, priceCategory, contactInfo, googleMapsUrl, heroImageUrl, galleryImages, description, }: {
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
        updateBusiness: (_: any, { id, name, location, priceCategory, contactInfo, googleMapsUrl, heroImageUrl, galleryImages, description, }: {
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
        deleteBusiness: (_: any, { id }: {
            id: string;
        }) => Promise<boolean>;
        addRating: (_: any, { businessId, userId, rating, comment, }: {
            businessId: string;
            userId: string;
            rating: number;
            comment?: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business").IBusiness> & import("../../../models/Business").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        updateRating: (_: any, { businessId, userId, rating, comment, }: {
            businessId: string;
            userId: string;
            rating: number;
            comment?: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business").IBusiness> & import("../../../models/Business").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        deleteRating: (_: any, { businessId, userId }: {
            businessId: string;
            userId: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business").IBusiness> & import("../../../models/Business").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    };
    Business: {
        averageRating: (parent: any) => number | null;
        totalRatings: (parent: any) => any;
    };
};
export default businessResolvers;
