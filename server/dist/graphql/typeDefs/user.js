"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.userTypeDefs = (0, apollo_server_express_1.gql) `
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
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
  }
`;
//# sourceMappingURL=user.js.map