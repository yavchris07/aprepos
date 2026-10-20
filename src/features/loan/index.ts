import type { CreateLoanPayload, Loan } from "./type";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = "/emprunts/";

export const loanApi = {
  // create: async (data: CreateLoanPayload, token: string) => {
  //   const res = await fetch(`${API_URL}${BASE_URL}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       ...(token ? { Authorization: `Token ${token}` } : {}),
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   const responseData = await res.json();
  //   console.log("==== xxx ==== xxx === :", responseData);

  //   if (!res.ok) {
  //     throw new Error(responseData.message || "Erreur de connexion");
  //   }
  //   return responseData;
  // },

  create: async (data: CreateLoanPayload, token: string) => {
    const res = await fetch(`${API_URL}${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    // 1. Récupérer le texte brut au lieu de .json() directement
    const rawText = await res.text();
    console.log("==== REPONSE BRUTE ====", rawText);

    // 2. Tenter de parser en JSON de manière sécurisée
    let responseData;
    try {
      responseData = rawText ? JSON.parse(rawText) : {};
    } catch (e) {
      console.error(
        "Erreur de parsing JSON. La réponse n'est pas du JSON :",
        rawText,
      );
      throw new Error(
        `Le serveur a renvoyé une réponse invalide (Status ${res.status})`,
        { cause: e },
      );
    }

    if (!res.ok) {
      throw new Error(
        responseData.message || `Erreur serveur (Status ${res.status})`,
      );
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

  update: async (token: string, data: Loan) => {
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
