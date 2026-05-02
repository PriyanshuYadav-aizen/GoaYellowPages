"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactResolvers = void 0;
const queries_js_1 = require("./queries.js");
const createContact_js_1 = require("./createContact.js");
const updateContact_js_1 = require("./updateContact.js");
const deleteContact_js_1 = require("./deleteContact.js");
exports.contactResolvers = {
    Query: {
        getContacts: queries_js_1.getContacts,
        getContact: queries_js_1.getContact,
    },
    Mutation: {
        createContact: createContact_js_1.createContact,
        updateContact: updateContact_js_1.updateContact,
        deleteContact: deleteContact_js_1.deleteContact,
    },
};
exports.default = exports.contactResolvers;
//# sourceMappingURL=index.js.map