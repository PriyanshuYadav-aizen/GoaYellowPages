import mongoose from "mongoose";
declare const resolvers: {
    Query: {
        getUsers: () => Promise<(mongoose.Document<unknown, {}, import("../../models/User.js").IUser> & import("../../models/User.js").IUser & {
            _id: mongoose.Types.ObjectId;
        })[]>;
    };
    Mutation: {
        register: (_: any, { name, email, password, role }: any) => Promise<{
            id: any;
            name: string;
            email: string;
            role: "superadmin" | "admin";
        }>;
        login: (_: any, { email, password }: any) => Promise<string>;
        createAdmin: (_: any, { name, email, password, businessId }: any, context: any) => Promise<{
            id: any;
            name: string;
            email: string;
            role: "superadmin" | "admin";
            businessId: string | undefined;
        }>;
        updateUser: (_: any, { id, name, email, businessId }: any, context: any) => Promise<{
            id: any;
            name: string;
            email: string;
            role: "superadmin" | "admin";
            businessId: string | undefined;
        }>;
        deleteUser: (_: any, { id }: any, context: any) => Promise<boolean>;
    };
};
export default resolvers;
