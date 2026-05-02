// Import all contact operations
import { getContacts, getContact } from "./queries";
import { createContact } from "./createContact";
import { updateContact } from "./updateContact";
import { deleteContact } from "./deleteContact";

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
