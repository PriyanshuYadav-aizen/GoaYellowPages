declare const resolvers: {
    Query: {
        getUsers: () => Promise<(import("mongoose").Document<unknown, {}, import("../../models/User").IUser> & import("../../models/User").IUser & {
            _id: import("mongoose").Types.ObjectId;
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
    };
};
export default resolvers;
