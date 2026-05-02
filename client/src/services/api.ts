import axios from "axios";
import { User, Business } from "../types";
import { API_URL } from "../config";

const API_BASE_URL = `${API_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Users API
export const usersAPI = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get("/users");
    return response.data;
  },

  getUser: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Businesses API
export const businessesAPI = {
  getBusinesses: async (): Promise<Business[]> => {
    const response = await api.get("/businesses");
    return response.data;
  },

  getBusiness: async (id: string): Promise<Business> => {
    const response = await api.get(`/businesses/${id}`);
    return response.data;
  },

  createBusiness: async (
    businessData: Omit<Business, "id" | "createdAt" | "updatedAt">
  ): Promise<Business> => {
    const response = await api.post("/businesses", businessData);
    return response.data;
  },

  updateBusiness: async (
    id: string,
    businessData: Partial<Business>
  ): Promise<Business> => {
    const response = await api.put(`/businesses/${id}`, businessData);
    return response.data;
  },

  deleteBusiness: async (id: string): Promise<void> => {
    await api.delete(`/businesses/${id}`);
  },
};

export default api;
