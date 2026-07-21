import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kindApi } from "..";
 

export const useDeleteKind = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => kindApi.delete(token, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kinds"],
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