import type { Member } from "../../utlis/type";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = "/membres/";

export const memberApi = {
  create: async (data: Member, token: string) => {
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

  getAll: async (token: string, page = 1) => {
    const response = await fetch(`${API_URL}${BASE_URL}?page=${page}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des membres");
    }

    return response.json();
  },

  members: async (token: string) => {
    const response = await fetch(`${API_URL}/liste_membres/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de la liste des membres");
    }

    return response.json();
  },

  get: async (token: string, id: string) => {
    const res = await fetch(
      `${API_URL}${BASE_URL}?search=${encodeURIComponent(id)}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Token ${token}` } : {}),
        },
      },
    );
    if (!res.ok) throw new Error("Erreur fetch member");
    return res.json();
  },

  update: async (token: string, data: Member) => {
    const res = await fetch(`${API_URL}${BASE_URL}${data.id}`, {
      method: "PATCH",
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
    const res = await fetch(`${API_URL}${BASE_URL}${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    });

    if (!res.ok) {
      throw new Error("Erreur delete account");
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },
};




// avec-token:"496d517ba6627b173f3430807fa3527456140808"