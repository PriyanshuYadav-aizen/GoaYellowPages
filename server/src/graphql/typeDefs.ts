import { gql } from "apollo-server-express";
import { userTypeDefs } from "./typeDefs/user";
import { businessTypeDefs } from "./typeDefs/business";
import { contactTypeDefs } from "./typeDefs/contact";
import { normalUserTypeDefs } from "./typeDefs/normalUser";

const rootTypeDefs = gql`
  type Query
  type Mutation
`;

const typeDefs = [rootTypeDefs, userTypeDefs, businessTypeDefs, contactTypeDefs, normalUserTypeDefs];

export default typeDefs;
