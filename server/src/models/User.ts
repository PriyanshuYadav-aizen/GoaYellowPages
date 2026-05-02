import mongoose, { Document, Schema, Model } from "mongoose";

// 1. Interface for User (typed version of a user document)
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin";
  businessId?: string; // Optional business ID for admin users
}

// 2. Mongoose schema
const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["superadmin", "admin"],
    default: "admin",
  },
  businessId: { type: String, required: false }, // Optional business ID
});

// 3. Mongoose model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
