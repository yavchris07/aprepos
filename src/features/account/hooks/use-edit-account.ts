
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountApi } from "..";
import type { Account } from "../../../utlis/type";

export const useEditeAccount = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Account) => accountApi.update(token, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });

  return {
    editAccount: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};
