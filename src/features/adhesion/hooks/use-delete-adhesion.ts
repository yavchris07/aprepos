
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adhesionApi } from "..";

export const useDeleteAdhesion = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => adhesionApi.delete(token, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adhesions"],
      });
    },
  });

  return {
    deleteUser: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};