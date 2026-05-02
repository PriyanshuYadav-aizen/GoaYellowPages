import Contact from "../../../models/Contact";

export const deleteContact = async (_: any, { id }: { id: string }) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new Error("Contact not found");
    }

    await Contact.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete contact"
    );
  }
};
