import type { LoginData } from "../../utlis/type";
const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = '/login/'

export const authApi = {
  login: async (data: LoginData) => {
    const res = await fetch(`${API_URL}${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    console.log("==== xxx ==== xxx === :", responseData);

    if (!res.ok) {
      throw new Error(responseData.message || "Erreur de connexion");
    }

    //save token
    if (responseData) {
      localStorage.setItem("avec-token", responseData.token);
    }
 
    // save user
    if (responseData) {
      const user = {
        id: responseData.user_id,
        username: responseData.username,
        email: responseData.email,
        role: responseData.role,
      };
      console.log('USER CEPARCREA : ', user)
      localStorage.setItem("avec-user", JSON.stringify(user));
    }

    return responseData;
  },

  logout: async (token: string) => {
    const res = await fetch(`${API_URL}/logout/`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Erreur logout");
    return res.json();
  },
};
