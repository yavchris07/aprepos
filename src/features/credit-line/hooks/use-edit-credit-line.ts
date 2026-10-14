import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creditLineApi } from "..";
import type { EditCantineLinePayload } from "../../../utlis/type";

export const useEditCreditLine = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: EditCantineLinePayload) => creditLineApi.update(token, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["credits-line"],
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
