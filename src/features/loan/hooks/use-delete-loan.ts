import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loanApi } from "..";

export const useDeleteLoan = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => loanApi.delete(token, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loans"],
      });
    },
  });

  return {
    deleteLoan: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};