import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Rate } from "../type";
import { rateApi } from "..";

export const useEditeRate = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Rate) => rateApi.update(token, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rates"],
      });
    },
  });

  return {
    editRate: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};
