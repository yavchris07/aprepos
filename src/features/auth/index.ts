import type { LoginData } from "../../utlis/type";

const API_URL = import.meta.env.BASE_URL;
// const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const authApi = {
  login: async (data: LoginData) => {
    const res = await fetch(`${API_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    console.log("==== xxx ==== xxx === :", responseData);

    if (!res.ok) {
      throw new Error(responseData.message || "Erreur de connexion");
    }
    return responseData;
  },

  logout: async (token: string) => {
    const res = await fetch(`${API_URL}/users/all`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },
};
