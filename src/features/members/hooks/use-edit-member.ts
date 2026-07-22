
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memberApi } from "..";
import type { Member } from "../../../utlis/type";

export const useEditeMember = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Member) => memberApi.update(token, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
  });

  return {
    editMember: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};
