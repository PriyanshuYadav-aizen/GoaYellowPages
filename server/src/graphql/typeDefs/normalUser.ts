import { gql } from "apollo-server-express";

export const normalUserTypeDefs = gql`
  type NormalUser {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  extend type Mutation {
    userRegister(name: String!, email: String!, password: String!): NormalUser
    userLogin(email: String!, password: String!): String
  }
`;


