import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    businessId: String
  }

  extend type Query {
    getUsers: [User]
  }

  extend type Mutation {
    register(
      name: String!
      email: String!
      password: String!
      role: String
    ): User
    login(email: String!, password: String!): String
    createAdmin(
      name: String!
      email: String!
      password: String!
      businessId: String
    ): User
    updateUser(id: ID!, name: String, email: String, businessId: String): User
    deleteUser(id: ID!): Boolean
  }
`;
