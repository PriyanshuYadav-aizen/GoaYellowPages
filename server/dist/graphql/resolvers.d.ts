declare const resolvers: {
    Query: {
        getContacts: () => Promise<(import("mongoose").Document<unknown, {}, import("../models/Contact.js").IContact> & import("../models/Contact.js").IContact & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        getContact: (_: any, { id }: {
            id: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Contact.js").IContact> & import("../models/Contact.js").IContact & {
            _id: import("mongoose").Types.ObjectId;
        }>;
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
        getUsers: () => Promise<(import("mongoose").Document<unknown, {}, import("../models/User.js").IUser> & import("../models/User.js").IUser & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
    };
    Mutation: {
        userRegister: (_: any, { name, email, password }: any) => Promise<{
            id: any;
            name: string;
            email: string;
            createdAt: string;
            updatedAt: string;
        }>;
        userLogin: (_: any, { email, password }: any) => Promise<string>;
        createContact: (_: any, { name, email, phone, address, latitude, longitude, googleMapsUrl, website, description, businessHours, socialMedia, }: {
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
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Contact.js").IContact> & import("../models/Contact.js").IContact & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        updateContact: (_: any, { id, name, email, phone, address, latitude, longitude, googleMapsUrl, website, description, businessHours, socialMedia, }: {
            id: string;
            name?: string;
            email?: string;
            phone?: string;
            address?: string;
            latitude?: number;
            longitude?: number;
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
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Contact.js").IContact> & import("../models/Contact.js").IContact & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        deleteContact: (_: any, { id }: {
            id: string;
        }) => Promise<boolean>;
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
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Business.js").IBusiness> & import("../models/Business.js").IBusiness & {
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
        }) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Business.js").IBusiness> & import("../models/Business.js").IBusiness & {
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
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Business.js").IBusiness> & import("../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        updateRating: (_: any, { businessId, userId, rating, comment, }: {
            businessId: string;
            userId: string;
            rating: number;
            comment?: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Business.js").IBusiness> & import("../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        deleteRating: (_: any, { businessId, userId }: {
            businessId: string;
            userId: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../models/Business.js").IBusiness> & import("../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        addFAQ: (_: any, { businessId, question, answer }: any) => Promise<import("mongoose").Document<unknown, {}, import("../models/Business.js").IBusiness> & import("../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        updateFAQ: (_: any, { businessId, faqIndex, question, answer }: any) => Promise<import("mongoose").Document<unknown, {}, import("../models/Business.js").IBusiness> & import("../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        deleteFAQ: (_: any, { businessId, faqIndex }: any) => Promise<import("mongoose").Document<unknown, {}, import("../models/Business.js").IBusiness> & import("../models/Business.js").IBusiness & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        incrementPublicView(_: any, { businessId, date }: {
            businessId: string;
            date?: string;
        }): Promise<any>;
        register: (_: any, { name, email, password, role }: any) => Promise<{
            id: any;
            name: string;
            email: string;
            role: "superadmin" | "admin";
        }>;
        login: (_: any, { email, password }: any) => Promise<string>;
        createAdmin: (_: any, { name, email, password, businessId }: any, context: any) => Promise<{
            id: any;
            name: string;
            email: string;
            role: "superadmin" | "admin";
            businessId: string | undefined;
        }>;
        updateUser: (_: any, { id, name, email, businessId }: any, context: any) => Promise<{
            id: any;
            name: string;
            email: string;
            role: "superadmin" | "admin";
            businessId: string | undefined;
        }>;
        deleteUser: (_: any, { id }: any, context: any) => Promise<boolean>;
    };
    Business: {
        averageRating: (parent: any) => number | null;
        totalRatings: (parent: any) => any;
    };
};
export default resolvers;
