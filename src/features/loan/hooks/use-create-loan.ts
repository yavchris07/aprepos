import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loanApi } from "..";
import type { CreateLoanPayload } from "../type";

export const useCreateLoan = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateLoanPayload) => loanApi.create(data, token),

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