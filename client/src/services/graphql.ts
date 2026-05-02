import { Business, Contact } from "../types";
import { API_URL } from "../config";

const GRAPHQL_URL = `${API_URL}/graphql`;

export const graphqlAPI = {
  getBusinesses: async (
    page: number = 1,
    limit: number = 9
  ): Promise<{
    businesses: Business[];
    totalPages: number;
    currentPage: number;
    totalBusinesses: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }> => {
    const query = `
      query GetBusinesses($page: Int, $limit: Int) {
        getBusinesses(page: $page, limit: $limit) {
          businesses {
            id
            name
            location
            category
            priceCategory
            phone
            email
            latitude
            longitude
            heroImageUrl
            galleryImages
            description
            faq {
              question
              answer
            }
            averageRating
            totalRatings
            isOpen
            openingTime
            closingTime
            ratings {
              userId
              rating
              comment
              createdAt
            }
            createdAt
            updatedAt
          }
          totalPages
          currentPage
          totalBusinesses
          hasNextPage
          hasPrevPage
        }
      }
    `;

    try {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { page, limit },
        }),
      });

      const result = await response.json();

      if (result.errors?.length) {
        throw new Error(result.errors[0].message || "GraphQL error");
      }

      if (!result.data || !result.data.getBusinesses) {
        throw new Error("Invalid response from server (getBusinesses)");
      }

      return result.data.getBusinesses;
    } catch (error) {
      console.error("Error fetching businesses:", error);
      throw new Error("Failed to fetch businesses");
    }
  },

  getBusiness: async (id: string): Promise<Business> => {
    const query = `
      query GetBusiness($id: ID!) {
        getBusiness(id: $id) {
          id
          name
          location
          category
          priceCategory
          phone
          email
          latitude
          longitude
          heroImageUrl
          galleryImages
          description
          faq {
            question
            answer
          }
          averageRating
          totalRatings
          isOpen
          openingTime
          closingTime
          publicViews
          ratings {
            userId
            rating
            comment
            createdAt
          }
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { id },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.getBusiness;
    } catch (error) {
      console.error("Error fetching business:", error);
      throw new Error("Failed to fetch business");
    }
  },

  incrementPublicView: async (
    businessId: string,
    date?: string
  ): Promise<Business> => {
    const mutation = `
      mutation IncrementPublicView($businessId: ID!, $date: String) {
        incrementPublicView(businessId: $businessId, date: $date) {
          id
          publicViews
        }
      }
    `;

    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: mutation,
        variables: { businessId, date },
      }),
    });
    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data.incrementPublicView;
  },

  createBusiness: async (businessData: {
    name: string;
    location: string;
    category?: string;
    priceCategory: string;
    phone: string;
    email: string;
    latitude: number;
    longitude: number;
    heroImage?: string;
    galleryImages?: string[];
    description: string;
    faq?: Array<{ question: string; answer: string }>;
    isOpen?: boolean;
    openingTime?: string;
    closingTime?: string;
  }): Promise<Business> => {
    const mutation = `
      mutation CreateBusiness(
        $name: String!
        $location: String!
        $category: String
        $priceCategory: String!
        $phone: String!
        $email: String!
        $latitude: Float!
        $longitude: Float!
        $heroImage: String
        $galleryImages: [String!]
        $description: String!
        $faq: [FAQInput!]
        $isOpen: Boolean
        $openingTime: String
        $closingTime: String
      ) {
        createBusiness(
          name: $name
          location: $location
          category: $category
          priceCategory: $priceCategory
          phone: $phone
          email: $email
          latitude: $latitude
          longitude: $longitude
          heroImage: $heroImage
          galleryImages: $galleryImages
          description: $description
          faq: $faq
          isOpen: $isOpen
          openingTime: $openingTime
          closingTime: $closingTime
        ) {
          id
          name
          location
          category
          priceCategory
          phone
          email
          latitude
          longitude
          heroImageUrl
          galleryImages
          description
          faq {
            question
            answer
          }
          averageRating
          totalRatings
          isOpen
          openingTime
          closingTime
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: businessData,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.createBusiness;
    } catch (error) {
      console.error("Error creating business:", error);
      throw new Error("Failed to create business");
    }
  },

  updateBusiness: async (
    id: string,
    businessData: Partial<{
      name: string;
      location: string;
      category?: string;
      priceCategory: string;
      phone: string;
      email: string;
      latitude: number;
      longitude: number;
      heroImage: string;
      galleryImages: string[];
      description: string;
      faq: Array<{ question: string; answer: string }>;
      isOpen: boolean;
      openingTime: string;
      closingTime: string;
    }>
  ): Promise<Business> => {
    const mutation = `
      mutation UpdateBusiness(
        $id: ID!
        $name: String
        $location: String
        $category: String
        $priceCategory: String
        $phone: String
        $email: String
        $latitude: Float
        $longitude: Float
        $heroImage: String
        $galleryImages: [String!]
        $description: String
        $faq: [FAQInput!]
        $isOpen: Boolean
        $openingTime: String
        $closingTime: String
      ) {
        updateBusiness(
          id: $id
          name: $name
          location: $location
          category: $category
          priceCategory: $priceCategory
          phone: $phone
          email: $email
          latitude: $latitude
          longitude: $longitude
          heroImage: $heroImage
          galleryImages: $galleryImages
          description: $description
          faq: $faq
          isOpen: $isOpen
          openingTime: $openingTime
          closingTime: $closingTime
        ) {
          id
          name
          location
          category
          priceCategory
          phone
          email
          latitude
          longitude
          heroImageUrl
          galleryImages
          description
          faq {
            question
            answer
          }
          averageRating
          totalRatings
          isOpen
          openingTime
          closingTime
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: { id, ...businessData },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.updateBusiness;
    } catch (error) {
      console.error("Error updating business:", error);
      throw new Error("Failed to update business");
    }
  },

  deleteBusiness: async (id: string): Promise<boolean> => {
    const mutation = `
      mutation DeleteBusiness($id: ID!) {
        deleteBusiness(id: $id)
      }
    `;

    try {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: { id },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.deleteBusiness;
    } catch (error) {
      console.error("Error deleting business:", error);
      throw new Error("Failed to delete business");
    }
  },

  // FAQ Operations
  addFAQ: async (
    businessId: string,
    question: string,
    answer: string
  ): Promise<Business> => {
    const mutation = `
      mutation AddFAQ($businessId: ID!, $question: String!, $answer: String!) {
        addFAQ(businessId: $businessId, question: $question, answer: $answer) {
          id
          name
          location
          category
          priceCategory
          phone
          email
          latitude
          longitude
          heroImageUrl
          galleryImages
          description
          faq {
            question
            answer
          }
          averageRating
          totalRatings
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: { businessId, question, answer },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.addFAQ;
    } catch (error) {
      console.error("Error adding FAQ:", error);
      throw new Error("Failed to add FAQ");
    }
  },

  updateFAQ: async (
    businessId: string,
    faqIndex: number,
    question: string,
    answer: string
  ): Promise<Business> => {
    const mutation = `
      mutation UpdateFAQ($businessId: ID!, $faqIndex: Int!, $question: String!, $answer: String!) {
        updateFAQ(businessId: $businessId, faqIndex: $faqIndex, question: $question, answer: $answer) {
          id
          name
          location
          category
          priceCategory
          phone
          email
          latitude
          longitude
          heroImageUrl
          galleryImages
          description
          faq {
            question
            answer
          }
          averageRating
          totalRatings
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: { businessId, faqIndex, question, answer },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.updateFAQ;
    } catch (error) {
      console.error("Error updating FAQ:", error);
      throw new Error("Failed to update FAQ");
    }
  },

  deleteFAQ: async (
    businessId: string,
    faqIndex: number
  ): Promise<Business> => {
    const mutation = `
      mutation DeleteFAQ($businessId: ID!, $faqIndex: Int!) {
        deleteFAQ(businessId: $businessId, faqIndex: $faqIndex) {
          id
          name
          location
          category
          priceCategory
          phone
          email
          latitude
          longitude
          heroImageUrl
          galleryImages
          description
          faq {
            question
            answer
          }
          averageRating
          totalRatings
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: { businessId, faqIndex },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.deleteFAQ;
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      throw new Error("Failed to delete FAQ");
    }
  },

  // Admin Management
  createAdmin: async (adminData: {
    name: string;
    email: string;
    password: string;
    businessId?: string;
  }): Promise<{
    id: string;
    name: string;
    email: string;
    role: string;
    businessId?: string;
  }> => {
    const mutation = `
      mutation CreateAdmin($name: String!, $email: String!, $password: String!, $businessId: String) {
        createAdmin(name: $name, email: $email, password: $password, businessId: $businessId) {
          id
          name
          email
          role
          businessId
        }
      }
    `;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: adminData,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.createAdmin;
    } catch (error) {
      console.error("Error creating admin:", error);
      throw new Error("Failed to create admin");
    }
  },

  getUsers: async (): Promise<
    {
      id: string;
      name: string;
      email: string;
      role: string;
      businessId?: string;
    }[]
  > => {
    const query = `
      query GetUsers {
        getUsers {
          id
          name
          email
          role
          businessId
        }
      }
    `;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query,
        }),
      });
      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      return result.data.getUsers;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  },

  updateUser: async (
    userId: string,
    userData: {
      name?: string;
      email?: string;
      businessId?: string;
    }
  ): Promise<{
    id: string;
    name: string;
    email: string;
    role: string;
    businessId?: string;
  }> => {
    const mutation = `
      mutation UpdateUser($id: ID!, $name: String, $email: String, $businessId: String) {
        updateUser(id: $id, name: $name, email: $email, businessId: $businessId) {
          id
          name
          email
          role
          businessId
        }
      }
    `;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            id: userId,
            ...userData,
          },
        }),
      });
      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      return result.data.updateUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  },

  deleteUser: async (userId: string): Promise<boolean> => {
    const mutation = `
      mutation DeleteUser($id: ID!) {
        deleteUser(id: $id)
      }
    `;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            id: userId,
          },
        }),
      });
      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      return result.data.deleteUser;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  },

  // Contact Operations
  getContacts: async (): Promise<Contact[]> => {
    const query = `
      query GetContacts {
        getContacts {
          id
          name
          email
          phone
          address
          latitude
          longitude
          googleMapsUrl
          website
          description
          businessHours
          socialMedia {
            facebook
            instagram
            twitter
            linkedin
          }
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.getContacts;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw new Error("Failed to fetch contacts");
    }
  },

  createContact: async (contactData: {
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
  }): Promise<Contact> => {
    const mutation = `
      mutation CreateContact(
        $name: String!
        $email: String!
        $phone: String!
        $address: String!
        $latitude: Float!
        $longitude: Float!
        $googleMapsUrl: String!
        $website: String!
        $description: String!
        $businessHours: String!
        $socialMedia: SocialMediaInput
      ) {
        createContact(
          name: $name
          email: $email
          phone: $phone
          address: $address
          latitude: $latitude
          longitude: $longitude
          googleMapsUrl: $googleMapsUrl
          website: $website
          description: $description
          businessHours: $businessHours
          socialMedia: $socialMedia
        ) {
          id
          name
          email
          phone
          address
          latitude
          longitude
          googleMapsUrl
          website
          description
          businessHours
          socialMedia {
            facebook
            instagram
            twitter
            linkedin
          }
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: contactData,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.createContact;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw new Error("Failed to create contact");
    }
  },

  updateContact: async (
    id: string,
    contactData: Partial<{
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
      socialMedia: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
      };
    }>
  ): Promise<Contact> => {
    const mutation = `
      mutation UpdateContact(
        $id: ID!
        $name: String
        $email: String
        $phone: String
        $address: String
        $latitude: Float
        $longitude: Float
        $googleMapsUrl: String
        $website: String
        $description: String
        $businessHours: String
        $socialMedia: SocialMediaInput
      ) {
        updateContact(
          id: $id
          name: $name
          email: $email
          phone: $phone
          address: $address
          latitude: $latitude
          longitude: $longitude
          googleMapsUrl: $googleMapsUrl
          website: $website
          description: $description
          businessHours: $businessHours
          socialMedia: $socialMedia
        ) {
          id
          name
          email
          phone
          address
          latitude
          longitude
          googleMapsUrl
          website
          description
          businessHours
          socialMedia {
            facebook
            instagram
            twitter
            linkedin
          }
          createdAt
          updatedAt
        }
      }
    `;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: { id, ...contactData },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.updateContact;
    } catch (error) {
      console.error("Error updating contact:", error);
      throw new Error("Failed to update contact");
    }
  },

  deleteContact: async (id: string): Promise<boolean> => {
    const mutation = `
      mutation DeleteContact($id: ID!) {
        deleteContact(id: $id)
      }
    `;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: { id },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.deleteContact;
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw new Error("Failed to delete contact");
    }
  },
};
