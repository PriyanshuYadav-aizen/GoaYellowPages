export declare const contactResolvers: {
    Query: {
        getContacts: () => Promise<(import("mongoose").Document<unknown, {}, import("../../../models/Contact.js").IContact> & import("../../../models/Contact.js").IContact & {
            _id: import("mongoose").Types.ObjectId;
        })[]>;
        getContact: (_: any, { id }: {
            id: string;
        }) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Contact.js").IContact> & import("../../../models/Contact.js").IContact & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    };
    Mutation: {
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
        }) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Contact.js").IContact> & import("../../../models/Contact.js").IContact & {
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
        }) => Promise<import("mongoose").Document<unknown, {}, import("../../../models/Contact.js").IContact> & import("../../../models/Contact.js").IContact & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        deleteContact: (_: any, { id }: {
            id: string;
        }) => Promise<boolean>;
    };
};
export default contactResolvers;
