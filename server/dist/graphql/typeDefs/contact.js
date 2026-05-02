"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.contactTypeDefs = (0, apollo_server_express_1.gql) `
  type SocialMedia {
    facebook: String
    instagram: String
    twitter: String
    linkedin: String
  }

  type Contact {
    id: ID!
    name: String!
    email: String!
    phone: String!
    address: String!
    latitude: Float
    longitude: Float
    googleMapsUrl: String!
    website: String!
    description: String!
    businessHours: String!
    socialMedia: SocialMedia!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getContacts: [Contact]
    getContact(id: ID!): Contact
  }

  extend type Mutation {
    createContact(
      name: String!
      email: String!
      phone: String!
      address: String!
      latitude: Float!
      longitude: Float!
      googleMapsUrl: String!
      website: String!
      description: String!
      businessHours: String!
      socialMedia: SocialMediaInput
    ): Contact
    updateContact(
      id: ID!
      name: String
      email: String
      phone: String
      address: String
      latitude: Float
      longitude: Float
      googleMapsUrl: String
      website: String
      description: String
      businessHours: String
      socialMedia: SocialMediaInput
    ): Contact
    deleteContact(id: ID!): Boolean
  }

  input SocialMediaInput {
    facebook: String
    instagram: String
    twitter: String
    linkedin: String
  }
`;
//# sourceMappingURL=contact.js.map