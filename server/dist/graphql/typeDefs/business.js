"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.businessTypeDefs = (0, apollo_server_express_1.gql) `
  type Rating {
    userId: String!
    rating: Int!
    comment: String
    createdAt: String!
  }

  type Business {
    id: ID!
    name: String!
    location: String!
    priceCategory: String!
    contactInfo: String!
    googleMapsUrl: String!
    heroImageUrl: String
    galleryImages: [String!]!
    description: String!
    ratings: [Rating!]!
    averageRating: Float
    totalRatings: Int
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getBusinesses: [Business]
    getBusiness(id: ID!): Business
  }

  extend type Mutation {
    createBusiness(
      name: String!
      location: String!
      priceCategory: String!
      contactInfo: String!
      googleMapsUrl: String!
      heroImageUrl: String
      galleryImages: [String!]
      description: String!
    ): Business
    updateBusiness(
      id: ID!
      name: String
      location: String
      priceCategory: String
      contactInfo: String
      googleMapsUrl: String
      heroImageUrl: String
      galleryImages: [String!]
      description: String
    ): Business
    deleteBusiness(id: ID!): Boolean
    addRating(
      businessId: ID!
      userId: String!
      rating: Int!
      comment: String
    ): Business
    updateRating(
      businessId: ID!
      userId: String!
      rating: Int!
      comment: String
    ): Business
    deleteRating(businessId: ID!, userId: String!): Business
  }
`;
//# sourceMappingURL=business.js.map