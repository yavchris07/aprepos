import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CantineLinePayload } from "../../../utlis/type";
import { creditLineApi } from "..";

export const useCreateCreditLine = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CantineLinePayload) => creditLineApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["credits-line"],
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