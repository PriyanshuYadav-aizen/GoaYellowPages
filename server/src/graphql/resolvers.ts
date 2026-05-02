import userResolvers from "./resolvers/user";
import businessResolvers from "./resolvers/business";
import contactResolvers from "./resolvers/contact";
import normalUserResolvers from "./resolvers/normalUser";

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...businessResolvers.Query,
    ...contactResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...businessResolvers.Mutation,
    ...contactResolvers.Mutation,
    ...normalUserResolvers.Mutation,
  },
  Business: businessResolvers.Business,
  // Add more types if needed
};

export default resolvers;
