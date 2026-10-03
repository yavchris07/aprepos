import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creditApi } from "..";
import type { EditCreditPayload } from "../../../utlis/type";

export const useEditCredit = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: EditCreditPayload) => creditApi.update(token, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["credits"],
      });
    },
  });

  return {
    editProduct: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};
