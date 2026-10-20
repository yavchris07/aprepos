import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionApi } from "..";
import type { CreateTransactionPayload } from "../type";

 
export const useCreateTransaction = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateTransactionPayload) => transactionApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
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
