const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = "/statistiques/totaux/";

export const statsApi = {

  getAll: async (token: string) => {
    const res = await fetch(`${API_URL}${BASE_URL}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur fetch stats");
    return res.json();
  },
   
};