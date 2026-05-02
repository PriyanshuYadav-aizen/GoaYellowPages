declare const normalUserResolvers: {
    Mutation: {
        userRegister: (_: any, { name, email, password }: any) => Promise<{
            id: any;
            name: string;
            email: string;
            createdAt: string;
            updatedAt: string;
        }>;
        userLogin: (_: any, { email, password }: any) => Promise<string>;
    };
};
export default normalUserResolvers;
