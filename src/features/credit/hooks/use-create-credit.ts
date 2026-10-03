import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCreditPayload } from "../../../utlis/type";
import { creditApi } from "..";

export const useCreateCredit = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateCreditPayload) => creditApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["credits"],
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