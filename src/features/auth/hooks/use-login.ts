import { useMutation } from "@tanstack/react-query";
import type { LoginData } from "../../../utlis/type";
import { authApi } from "..";


export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: (data: LoginData) => authApi.login(data),
  });

  return {
    login: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};



    // "token": "496d517ba6627b173f3430807fa3527456140808",
    // "user_id": 2,
    // "username": "Test1",
    // "email": "test@gmail.com"