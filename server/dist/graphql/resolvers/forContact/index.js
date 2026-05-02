"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactResolvers = void 0;
const queries_1 = require("./queries");
const createContact_1 = require("./createContact");
const updateContact_1 = require("./updateContact");
const deleteContact_1 = require("./deleteContact");
exports.contactResolvers = {
    Query: {
        getContacts: queries_1.getContacts,
        getContact: queries_1.getContact,
    },
    Mutation: {
        createContact: createContact_1.createContact,
        updateContact: updateContact_1.updateContact,
        deleteContact: deleteContact_1.deleteContact,
    },
};
exports.default = exports.contactResolvers;
//# sourceMappingURL=index.js.map