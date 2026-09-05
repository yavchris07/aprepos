import type { Account } from "../../utlis/type";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = "/comptes/";

// https://ceparcrea.acedh-rdc.org/api/liste_comptes/

export const accountApi = {
  create: async (data: Account, token: string) => {
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

  accounts : async (token:string)=> {
    const response = await fetch(`${API_URL}/liste_comptes/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de la liste des membres");
    }

    return response.json();
  },

  get: async (token: string, id:number) => {
    const res = await fetch(`${API_URL}${BASE_URL}?search=${id}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch user");
    return res.json();
  },

  update: async (token: string, data: Account) => {
    const res = await fetch(`${API_URL}${BASE_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    // if (!res.ok) throw new Error("Erreur update account");
    // return res.json();

    if (!res.ok) {
      throw new Error("Erreur delete account");
    }

    const text = await res.text();

    return text ? JSON.parse(text) : res;
  },

  delete: async (token: string, id: number) => {
    const res = await fetch(`${API_URL}${BASE_URL}${id}/`, {
      method: "DELETE",
      headers: {
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


// https://ceparcrea.acedh-rdc.org/api/comptes/?search=1585 3745 2830 901