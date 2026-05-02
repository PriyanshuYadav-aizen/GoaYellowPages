import mongoose, { Document } from "mongoose";
export interface IContact extends Document {
    name: string;
    email: string;
    phone: string;
    address: string;
    latitude?: number;
    longitude?: number;
    googleMapsUrl: string;
    website: string;
    description: string;
    businessHours: string;
    socialMedia: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
    };
}
declare const _default: mongoose.Model<IContact, {}, {}, {}, mongoose.Document<unknown, {}, IContact> & IContact & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
