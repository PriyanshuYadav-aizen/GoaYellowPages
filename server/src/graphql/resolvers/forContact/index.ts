// Import all contact operations
import { getContacts, getContact } from "./queries.js";
import { createContact } from "./createContact.js";
import { updateContact } from "./updateContact.js";
import { deleteContact } from "./deleteContact.js";

// Export all contact resolvers
export const contactResolvers = {
  Query: {
    getContacts,
    getContact,
  },
  Mutation: {
    createContact,
    updateContact,
    deleteContact,
  },
};

export default contactResolvers;
