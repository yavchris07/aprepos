import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Loan } from "../../../utlis/type";
import { loanApi } from "..";

export const useCreateLoan = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Loan) => loanApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loans"],
      });
    },
  });

  return {
    create: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};