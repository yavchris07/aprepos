import type { Loan } from "../../utlis/type";

const API_URL = import.meta.env.BASE_URL;

export const loanApi = {
  create: async (data: Loan, token: string) => {
    const res = await fetch(`${API_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
    const res = await fetch(`${API_URL}/users/all`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch users");
    return res.json();
  },

  get: async (token: string) => {
    const res = await fetch(`${API_URL}/users/get`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch user");
    return res.json();
  },

  update: async (token: string, data: Loan) => {
    const res = await fetch(`${API_URL}/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Erreur update user");
    return res.json();
  },

  delete: async (token: string, id: number) => {
    const res = await fetch(`${API_URL}/users/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Erreur delete user");
    return res.json();
  },
};
