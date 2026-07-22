
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionApi } from "..";
import type { Transaction } from "../../../utlis/type";

export const useEditeTransaction = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Transaction) => transactionApi.update(token, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });

  return {
    editTransaction: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};
