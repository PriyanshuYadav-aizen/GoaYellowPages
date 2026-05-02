import Contact from "../../../models/Contact";

export const updateContact = async (
  _: any,
  {
    id,
    name,
    email,
    phone,
    address,
    latitude,
    longitude,
    googleMapsUrl,
    website,
    description,
    businessHours,
    socialMedia,
  }: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    googleMapsUrl?: string;
    website?: string;
    description?: string;
    businessHours?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
  }
) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new Error("Contact not found");
    }

    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }
    }

    // Validate latitude and longitude if provided
    if (latitude !== undefined && (latitude < -90 || latitude > 90)) {
      throw new Error("Latitude must be between -90 and 90");
    }
    if (longitude !== undefined && (longitude < -180 || longitude > 180)) {
      throw new Error("Longitude must be between -180 and 180");
    }

    // Update fields if provided
    if (name) contact.name = name;
    if (email) contact.email = email;
    if (phone) contact.phone = phone;
    if (address) contact.address = address;
    if (latitude !== undefined) contact.latitude = latitude;
    if (longitude !== undefined) contact.longitude = longitude;
    if (googleMapsUrl) contact.googleMapsUrl = googleMapsUrl;
    if (website) contact.website = website;
    if (description) contact.description = description;
    if (businessHours) contact.businessHours = businessHours;
    if (socialMedia) {
      contact.socialMedia = {
        ...contact.socialMedia,
        ...socialMedia,
      };
    }

    await contact.save();
    return contact;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update contact"
    );
  }
};
