'use client';
import { useState } from "react";
import { authApi } from "../api";

export const useLogout = (token: string) => {

  const [pending, setPending] = useState(false);
  const [fail, setFail] = useState("");

  const logout = async () => {
    if (pending) return;
    try {
      setPending(true);
      setFail("");
      const response = await authApi.logout(token);
      return response;
    } catch (error) {

      if (error instanceof Error) {
        setFail(error.message);
      } else {
        setFail(
          "Une erreur inconnue est survenue"
        );
      }
      throw error;

    } finally {

      setPending(false);
    }
  };

  return { logout, pending, fail };
};