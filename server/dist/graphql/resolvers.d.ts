declare const resolvers: {
    Query: {
        getContacts: () => Promise<(import("mongoose").Document<unknown, {}, import("../models/Contact").IContact> & import("../models/Contact").IContact & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        getContact: (_: any, { id }: {
            id: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Contact").IContact> & import("../models/Contact").IContact & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        getBusinesses: () => Promise<(import("mongoose").Document<unknown, {}, import("../models/Business").IBusiness> & import("../models/Business").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        getBusiness: (_: any, { id }: {
            id: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Business").IBusiness> & import("../models/Business").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        getUsers: () => Promise<(import("mongoose").Document<unknown, {}, import("../models/User").IUser> & import("../models/User").IUser & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
    };
    Mutation: {
        createContact: (_: any, { name, email, phone, address, googleMapsUrl, website, description, businessHours, socialMedia, }: {
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
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Contact").IContact> & import("../models/Contact").IContact & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        updateContact: (_: any, { id, name, email, phone, address, googleMapsUrl, website, description, businessHours, socialMedia, }: {
            id: string;
            name?: string;
            email?: string;
            phone?: string;
            address?: string;
            googleMapsUrl?: string;
            website?: string;
            description?: string;
            businessHours?: string;
            socialMedia?: {
                facebook?: string;
                instagram?: string;
                twitter?: string;
                linkedin?: string;
            };
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Contact").IContact> & import("../models/Contact").IContact & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        deleteContact: (_: any, { id }: {
            id: string;
        }) => Promise<boolean>;
        createBusiness: (_: any, { name, location, priceCategory, contactInfo, googleMapsUrl, heroImageUrl, galleryImages, description, }: {
            name: string;
            location: string;
            priceCategory: string;
            contactInfo: string;
            googleMapsUrl: string;
            heroImageUrl?: string;
            galleryImages?: string[];
            description: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Business").IBusiness> & import("../models/Business").IBusiness & {
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
        }) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Business").IBusiness> & import("../models/Business").IBusiness & {
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
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Business").IBusiness> & import("../models/Business").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        updateRating: (_: any, { businessId, userId, rating, comment, }: {
            businessId: string;
            userId: string;
            rating: number;
            comment?: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Business").IBusiness> & import("../models/Business").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        deleteRating: (_: any, { businessId, userId }: {
            businessId: string;
            userId: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Business").IBusiness> & import("../models/Business").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        register: (_: any, { name, email, password, role }: any) => Promise<{
            id: any;
            name: string;
            email: string;
            role: "superadmin" | "admin";
        }>;
        login: (_: any, { email, password }: any) => Promise<string>;
    };
    Business: {
        averageRating: (parent: any) => number | null;
        totalRatings: (parent: any) => any;
    };
};
export default resolvers;
