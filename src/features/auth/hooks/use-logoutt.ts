
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "..";

export const useLogout = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => authApi.logout(token),

    onSuccess: () => {
      // Vide le cache après la déconnexion
      queryClient.clear();
    },
  });

  return {
    logout: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};

 