import { API_URL } from "../config";

const GRAPHQL_URL = `${API_URL}/graphql`;

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const normalUserAuthAPI = {
  register: async (data: RegisterInput): Promise<void> => {
    const mutation = `
      mutation UserRegister($name: String!, $email: String!, $password: String!) {
        userRegister(name: $name, email: $email, password: $password) {
          id
          name
          email
        }
      }
    `;

    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation, variables: data }),
    });
    const result = await response.json();
    if (result.errors) throw new Error(result.errors[0].message);
  },

  login: async (data: LoginInput): Promise<void> => {
    const mutation = `
      mutation UserLogin($email: String!, $password: String!) {
        userLogin(email: $email, password: $password)
      }
    `;
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation, variables: data }),
    });
    const result = await response.json();
    if (result.errors) throw new Error(result.errors[0].message);
    const token = result.data.userLogin as string;
    localStorage.setItem("normal_user_token", token);
  },

  logout: (): void => {
    localStorage.removeItem("normal_user_token");
  },

  getToken: (): string | null => localStorage.getItem("normal_user_token"),
};


