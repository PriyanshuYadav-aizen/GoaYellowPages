"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const user_js_1 = require("./typeDefs/user.js");
const business_js_1 = require("./typeDefs/business.js");
const contact_js_1 = require("./typeDefs/contact.js");
const normalUser_js_1 = require("./typeDefs/normalUser.js");
const rootTypeDefs = (0, apollo_server_express_1.gql) `
  type Query
  type Mutation
`;
const typeDefs = [rootTypeDefs, user_js_1.userTypeDefs, business_js_1.businessTypeDefs, contact_js_1.contactTypeDefs, normalUser_js_1.normalUserTypeDefs];
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map