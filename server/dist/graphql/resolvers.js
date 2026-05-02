"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./resolvers/user"));
const business_1 = __importDefault(require("./resolvers/business"));
const contact_1 = __importDefault(require("./resolvers/contact"));
const resolvers = {
    Query: {
        ...user_1.default.Query,
        ...business_1.default.Query,
        ...contact_1.default.Query,
    },
    Mutation: {
        ...user_1.default.Mutation,
        ...business_1.default.Mutation,
        ...contact_1.default.Mutation,
    },
    Business: business_1.default.Business,
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map