import { gql } from "apollo-server-express";

export const businessTypeDefs = gql`
  type FAQ {
    question: String!
    answer: String!
  }

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
    category: String
    priceCategory: String!
    phone: String!
    email: String!
    latitude: Float!
    longitude: Float!
    heroImageUrl: String
    galleryImages: [String!]!
    description: String!
    faq: [FAQ!]!
    ratings: [Rating!]!
    averageRating: Float
    totalRatings: Int
    isOpen: Boolean
    openingTime: String
    closingTime: String
    publicViews: Int
    createdAt: String!
    updatedAt: String!
  }

  type PaginatedBusinesses {
    businesses: [Business]!
    totalPages: Int!
    currentPage: Int!
    totalBusinesses: Int!
    hasNextPage: Boolean!
    hasPrevPage: Boolean!
  }

  extend type Query {
    getBusinesses(page: Int = 1, limit: Int = 9): PaginatedBusinesses
    getBusiness(id: ID!): Business
  }

  extend type Mutation {
    createBusiness(
      name: String!
      location: String!
      category: String
      priceCategory: String!
      phone: String!
      email: String!
      latitude: Float!
      longitude: Float!
      heroImage: String
      galleryImages: [String!]
      description: String!
      faq: [FAQInput!]
      isOpen: Boolean
      openingTime: String
      closingTime: String
    ): Business
    updateBusiness(
      id: ID!
      name: String
      location: String
      category: String
      priceCategory: String
      phone: String
      email: String
      latitude: Float
      longitude: Float
      heroImage: String
      galleryImages: [String!]
      description: String
      faq: [FAQInput!]
      isOpen: Boolean
      openingTime: String
      closingTime: String
    ): Business
    deleteBusiness(id: ID!): Boolean
    addFAQ(businessId: ID!, question: String!, answer: String!): Business
    updateFAQ(
      businessId: ID!
      faqIndex: Int!
      question: String!
      answer: String!
    ): Business
    deleteFAQ(businessId: ID!, faqIndex: Int!): Business
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
    incrementPublicView(businessId: ID!, date: String): Business
  }

  input FAQInput {
    question: String!
    answer: String!
  }
`;
