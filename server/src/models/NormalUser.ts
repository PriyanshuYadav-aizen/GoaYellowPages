import mongoose, { Document, Model, Schema } from "mongoose";

export interface INormalUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const normalUserSchema: Schema<INormalUser> = new mongoose.Schema<INormalUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const NormalUser: Model<INormalUser> = mongoose.model<INormalUser>(
  "NormalUser",
  normalUserSchema
);

export default NormalUser;


