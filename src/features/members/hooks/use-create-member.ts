import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Member } from "../../../utlis/type";
import { memberApi } from "..";

export const useCreateMember = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Member) => memberApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members"],
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