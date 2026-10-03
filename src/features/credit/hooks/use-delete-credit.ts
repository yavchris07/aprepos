import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creditApi } from "..";

export const useDeleteCredit = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => creditApi.delete(token, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["credits"],
      });
    },
  });

  return {
    deleteCredit: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};