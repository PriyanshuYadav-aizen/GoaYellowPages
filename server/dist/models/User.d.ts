import { Document, Model } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "superadmin" | "admin";
    businessId?: string;
}
declare const User: Model<IUser>;
export default User;
