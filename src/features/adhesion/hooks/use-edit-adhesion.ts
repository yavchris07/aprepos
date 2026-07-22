
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adhesionApi } from "..";
import type { Adhesion } from "../../../utlis/type";

export const useEditeAdhesion = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Adhesion) => adhesionApi.update(token, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adhesions"],
      });
    },
  });

  return {
    editAdhesion: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};
