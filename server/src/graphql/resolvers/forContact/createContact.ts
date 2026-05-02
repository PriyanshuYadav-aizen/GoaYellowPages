import Contact from "../../../models/Contact";

export const createContact = async (
  _: any,
  {
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
    name: string;
    email: string;
    phone: string;
    address: string;
    latitude: number;
    longitude: number;
    googleMapsUrl: string;
    website: string;
    description: string;
    businessHours: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
  }
) => {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // Validate latitude and longitude
    if (latitude < -90 || latitude > 90) {
      throw new Error("Latitude must be between -90 and 90");
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error("Longitude must be between -180 and 180");
    }

    const contact = new Contact({
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
      socialMedia: socialMedia || {},
    });

    await contact.save();
    return contact;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create contact"
    );
  }
};
