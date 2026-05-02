import { Document, Model } from "mongoose";
export interface INormalUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const NormalUser: Model<INormalUser>;
export default NormalUser;
