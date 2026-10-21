import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rateApi } from "..";

export const useDeleteRate = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => rateApi.delete(token, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rates"],
      });
    },
  });

  return {
    deleteRate: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};
