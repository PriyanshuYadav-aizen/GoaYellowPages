import mongoose, { Document, Schema } from "mongoose";

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

const businessSchema = new Schema<IBusiness>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: false },
    priceCategory: {
      type: String,
      enum: ["cheap", "moderate", "expensive"],
      required: true,
    },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    heroImageUrl: { type: String, required: false },
    heroImagePublicId: { type: String, required: false },
    galleryImages: [{ type: String }],
    galleryImagePublicIds: [{ type: String }],
    description: { type: String, required: true },
    faq: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    ratings: [
      {
        userId: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isOpen: { type: Boolean, default: false },
    openingTime: { type: String, required: false },
    closingTime: { type: String, required: false },
    publicViews: { type: Number, default: 0 },
    publicViewsByDate: { type: Map, of: Number, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model<IBusiness>("Business", businessSchema);
