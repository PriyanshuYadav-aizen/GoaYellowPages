import userResolvers from "./resolvers/user.js";
import businessResolvers from "./resolvers/business.js";
import contactResolvers from "./resolvers/contact.js";
import normalUserResolvers from "./resolvers/normalUser.js";

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
