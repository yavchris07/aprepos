import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adhesionApi } from "..";
import type { Adhesion } from "../../../utlis/type";

export const useCreateAdhesion = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Adhesion) => adhesionApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adhesions"],
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