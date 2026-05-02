"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const user_1 = require("./typeDefs/user");
const business_1 = require("./typeDefs/business");
const contact_1 = require("./typeDefs/contact");
const rootTypeDefs = (0, apollo_server_express_1.gql) `
  type Query
  type Mutation
`;
const typeDefs = [
    rootTypeDefs,
    user_1.userTypeDefs,
    business_1.businessTypeDefs,
    contact_1.contactTypeDefs,
];
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map