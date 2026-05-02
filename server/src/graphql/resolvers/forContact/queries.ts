import Contact from "../../../models/Contact";

export const getContacts = async () => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contacts");
  }
};

export const getContact = async (_: any, { id }: { id: string }) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw new Error("Failed to fetch contact");
  }
};
