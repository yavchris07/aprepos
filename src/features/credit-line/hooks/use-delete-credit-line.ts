import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creditLineApi } from "..";

export const useDeleteCreditLine = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => creditLineApi.delete(token, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["credits-line"],
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