import { gql } from "apollo-server-express";
import { userTypeDefs } from "./typeDefs/user.js";
import { businessTypeDefs } from "./typeDefs/business.js";
import { contactTypeDefs } from "./typeDefs/contact.js";
import { normalUserTypeDefs } from "./typeDefs/normalUser.js";

const rootTypeDefs = gql`
  type Query
  type Mutation
`;

const typeDefs = [rootTypeDefs, userTypeDefs, businessTypeDefs, contactTypeDefs, normalUserTypeDefs];

export default typeDefs;
