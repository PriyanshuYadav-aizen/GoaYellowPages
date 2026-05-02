import mongoose, { Document } from "mongoose";
export interface IBusiness extends Document {
    name: string;
    location: string;
    priceCategory: "cheap" | "moderate" | "expensive";
    contactInfo: string;
    googleMapsUrl: string;
    heroImageUrl?: string;
    galleryImages: string[];
    description: string;
    ratings: Array<{
        userId: string;
        rating: number;
        comment?: string;
        createdAt: Date;
    }>;
}
declare const _default: mongoose.Model<IBusiness, {}, {}, {}, mongoose.Document<unknown, {}, IBusiness> & IBusiness & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
