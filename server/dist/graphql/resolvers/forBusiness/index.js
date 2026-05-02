"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessResolvers = void 0;
const queries_1 = require("./queries");
const createBusiness_1 = require("./createBusiness");
const updateBusiness_1 = require("./updateBusiness");
const deleteBusiness_1 = require("./deleteBusiness");
const ratingOperations_1 = require("./ratingOperations");
const businessTypeResolvers_1 = require("./businessTypeResolvers");
exports.businessResolvers = {
    Query: {
        getBusinesses: queries_1.getBusinesses,
        getBusiness: queries_1.getBusiness,
    },
    Mutation: {
        createBusiness: createBusiness_1.createBusiness,
        updateBusiness: updateBusiness_1.updateBusiness,
        deleteBusiness: deleteBusiness_1.deleteBusiness,
        addRating: ratingOperations_1.addRating,
        updateRating: ratingOperations_1.updateRating,
        deleteRating: ratingOperations_1.deleteRating,
    },
    Business: businessTypeResolvers_1.Business,
};
exports.default = exports.businessResolvers;
//# sourceMappingURL=index.js.map