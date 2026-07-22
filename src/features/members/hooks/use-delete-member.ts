
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  memberApi } from "..";

export const useDeleteMember = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => memberApi.delete(token, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
  });

  return {
    deleteMember: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};