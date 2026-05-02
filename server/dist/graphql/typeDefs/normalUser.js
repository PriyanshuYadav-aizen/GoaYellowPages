"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalUserTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.normalUserTypeDefs = (0, apollo_server_express_1.gql) `
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
//# sourceMappingURL=normalUser.js.map