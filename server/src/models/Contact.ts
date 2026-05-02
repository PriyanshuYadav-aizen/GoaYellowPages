import mongoose, { Document, Schema } from "mongoose";

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

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    googleMapsUrl: { type: String, required: true },
    website: { type: String, required: true },
    description: { type: String, required: true },
    businessHours: { type: String, required: true },
    socialMedia: {
      facebook: { type: String, required: false },
      instagram: { type: String, required: false },
      twitter: { type: String, required: false },
      linkedin: { type: String, required: false },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IContact>("Contact", contactSchema);
