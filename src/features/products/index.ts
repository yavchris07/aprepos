import type { CreateProductPayload, EditProductPayload,  } from "../../utlis/type";
const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = "/cantine/produits/";

export const productApi = {
  create: async (data: CreateProductPayload, token: string) => {
    const res = await fetch(`${API_URL}${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    const text = await res.text();

    console.log("Status :", res.status);
    console.log("Response :", text);

    try {
      const json = JSON.parse(text);

      if (!res.ok) {
        throw new Error(json.message || JSON.stringify(json));
      }

      return json;
    } catch {
      throw new Error(`Le serveur n'a pas renvoyé du JSON.\n${text}`);
    }
  },

  getAll: async (token: string, page: number) => {
    const res = await fetch(`${API_URL}${BASE_URL}?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch product");
    return res.json();
  },

  products: async (token: string) => {
    const response = await fetch(`${API_URL}${BASE_URL}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de la liste des products");
    }

    return response.json();
  },

  update: async (token: string, data: EditProductPayload) => {
    const res = await fetch(`${API_URL}${BASE_URL}${data.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update product");
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
      throw new Error("Erreur delete product");
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },
};
