import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loanApi } from "..";
import type { Loan } from "../../../utlis/type";

export const useEditLoan = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Loan) => loanApi.update(token, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loans"],
      });
    },
  });

  return {
    editLoan: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};
