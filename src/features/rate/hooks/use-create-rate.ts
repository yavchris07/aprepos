import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rateApi } from "..";
import type { CreateRatePayload } from "../type";

export const useCreateRate = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateRatePayload) => rateApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rates"],
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