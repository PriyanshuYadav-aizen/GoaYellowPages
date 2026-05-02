export interface User {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Rating {
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface Business {
  id: string;
  name: string;
  location: string;
  category?: string;
  priceCategory: "cheap" | "moderate" | "expensive";
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  heroImageUrl?: string;
  galleryImages: string[];
  description: string;
  faq: FAQ[];
  ratings: Rating[];
  averageRating?: number;
  totalRatings?: number;
  isOpen?: boolean;
  openingTime?: string;
  closingTime?: string;
  publicViews?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl: string;
  website: string;
  description: string;
  businessHours: string;
  socialMedia: SocialMedia;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data?: T;
  message: string;
  success: boolean;
}
