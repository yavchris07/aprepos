import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Kind } from "../../../utlis/type";
import { kindApi } from "..";

export const useCreateKind = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Kind) => kindApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kinds"],
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