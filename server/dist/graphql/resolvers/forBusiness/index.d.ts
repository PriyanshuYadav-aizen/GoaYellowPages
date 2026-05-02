export declare const businessResolvers: {
    Query: {
        getBusinesses: (_: any, { page, limit }: {
            page?: number;
            limit?: number;
        }) => Promise<{
            businesses: any[];
            totalPages: number;
            currentPage: number;
            totalBusinesses: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        }>;
        getBusiness: (_: any, { id }: {
            id: string;
        }) => Promise<any>;
    };
    Mutation: {
        createBusiness: (_: any, { name, location, category, priceCategory, phone, email, latitude, longitude, heroImage, galleryImages, description, faq, isOpen, openingTime, closingTime, }: {
            name: string;
            location: string;
            category: string;
            priceCategory: string;
            phone: string;
            email: string;
            latitude: number;
            longitude: number;
            heroImage?: string;
            galleryImages?: string[];
            description: string;
            faq?: Array<{
                question: string;
                answer: string;
            }>;
            isOpen?: boolean;
            openingTime?: string;
            closingTime?: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business.js").IBusiness> & import("../../../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        updateBusiness: (_: any, { id, name, location, category, priceCategory, phone, email, latitude, longitude, heroImage, galleryImages, description, faq, isOpen, openingTime, closingTime, }: {
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
        deleteBusiness: (_: any, { id }: {
            id: string;
        }) => Promise<boolean>;
        addRating: (_: any, { businessId, userId, rating, comment, }: {
            businessId: string;
            userId: string;
            rating: number;
            comment?: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business.js").IBusiness> & import("../../../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        updateRating: (_: any, { businessId, userId, rating, comment, }: {
            businessId: string;
            userId: string;
            rating: number;
            comment?: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business.js").IBusiness> & import("../../../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        deleteRating: (_: any, { businessId, userId }: {
            businessId: string;
            userId: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business.js").IBusiness> & import("../../../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        addFAQ: (_: any, { businessId, question, answer }: any) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business.js").IBusiness> & import("../../../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        updateFAQ: (_: any, { businessId, faqIndex, question, answer }: any) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business.js").IBusiness> & import("../../../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        deleteFAQ: (_: any, { businessId, faqIndex }: any) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Business.js").IBusiness> & import("../../../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        incrementPublicView(_: any, { businessId, date }: {
            businessId: string;
            date?: string;
        }): Promise<any>;
    };
    Business: {
        averageRating: (parent: any) => number | null;
        totalRatings: (parent: any) => any;
    };
};
export default businessResolvers;
