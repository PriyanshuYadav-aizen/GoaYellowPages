import mongoose, { Document } from "mongoose";
export interface IBusiness extends Document {
    name: string;
    location: string;
    category: string;
    priceCategory: "cheap" | "moderate" | "expensive";
    phone: string;
    email: string;
    latitude: number;
    longitude: number;
    heroImageUrl?: string;
    heroImagePublicId?: string;
    galleryImages: string[];
    galleryImagePublicIds: string[];
    description: string;
    faq: Array<{
        question: string;
        answer: string;
    }>;
    ratings: Array<{
        userId: string;
        rating: number;
        comment?: string;
        createdAt: Date;
    }>;
    isOpen: boolean;
    openingTime?: string;
    closingTime?: string;
    publicViews?: number;
    publicViewsByDate?: Record<string, number>;
}
declare const _default: mongoose.Model<IBusiness, {}, {}, {}, mongoose.Document<unknown, {}, IBusiness> & IBusiness & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
