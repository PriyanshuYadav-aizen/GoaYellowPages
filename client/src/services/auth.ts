import { AuthResponse } from "../types";
import { API_URL } from "../config";

const GRAPHQL_URL = `${API_URL}/graphql`;

export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<AuthResponse> => {
    const mutation = `
      mutation Register($name: String!, $email: String!, $password: String!, $role: String) {
        register(name: $name, email: $email, password: $password, role: $role) {
          id
          name
          email
          role
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
          variables: userData,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const user = result.data.register;

      return {
        message: "Registration successful",
        token: "", // Registration doesn't return a token, user needs to login
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to register"
      );
    }
  },

  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const mutation = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
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
          variables: credentials,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const token = result.data.login;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Decode token to get user info (basic implementation)
      // In a real app, you might want to fetch user details separately
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));

      return {
        message: "Login successful",
        token,
        user: {
          id: tokenPayload.id,
          name: "", // Would need to fetch from server
          email: credentials.email,
          role: tokenPayload.role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to login"
      );
    }
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("token");
  },

  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },

  getUserRole: (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      return tokenPayload.role;
    } catch (error) {
      return null;
    }
  },

  getUserBusinessId: (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      return tokenPayload.businessId || null;
    } catch (error) {
      return null;
    }
  },

  isSuperAdmin: (): boolean => {
    return authAPI.getUserRole() === "superadmin";
  },

  isAdmin: (): boolean => {
    const role = authAPI.getUserRole();
    return role === "admin" || role === "superadmin";
  },
};
