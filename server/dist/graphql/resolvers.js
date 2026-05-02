"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_js_1 = __importDefault(require("./resolvers/user.js"));
const business_js_1 = __importDefault(require("./resolvers/business.js"));
const contact_js_1 = __importDefault(require("./resolvers/contact.js"));
const normalUser_js_1 = __importDefault(require("./resolvers/normalUser.js"));
const resolvers = {
    Query: {
        ...user_js_1.default.Query,
        ...business_js_1.default.Query,
        ...contact_js_1.default.Query,
    },
    Mutation: {
        ...user_js_1.default.Mutation,
        ...business_js_1.default.Mutation,
        ...contact_js_1.default.Mutation,
        ...normalUser_js_1.default.Mutation,
    },
    Business: business_js_1.default.Business,
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map