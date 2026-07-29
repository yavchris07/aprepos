import type { Kind } from "../../utlis/type";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = '/type-membres/'

export const kindApi = {
  create: async (data: Kind, token: string) => {
    const res = await fetch(`${API_URL}${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
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

  getAll: async (token: string) => {
    const res = await fetch(`${API_URL}${BASE_URL}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },

  get: async (token: string) => {
    const res = await fetch(`${API_URL}${BASE_URL}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch user");
    return res.json();
  },

  update: async (token: string, data: Kind) => {
    const res = await fetch(`${API_URL}${BASE_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update user");
    return res.json();
  },

  delete: async (token: string, id: number) => {
    const res = await fetch(`${API_URL}${BASE_URL}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Erreur delete user");
    return res.json();
  },
};
