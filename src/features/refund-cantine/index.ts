import type { EditCantineLinePayload } from "../../utlis/type";
import type { RefundCantinePayload } from "./type";
const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = "/cantine/remboursements/";

export const refundCantineApi = {
  create: async (data: RefundCantinePayload, token: string) => {
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
    if (!res.ok) throw new Error("Erreur fetch credit line");
    return res.json();
  },

  update: async (token: string, data: EditCantineLinePayload) => {
    const res = await fetch(`${API_URL}${BASE_URL}${data.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update credit line");
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
      throw new Error("Erreur delete credit line");
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },
};
