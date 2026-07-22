
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialApi } from "..";
import type { Social } from "../../../utlis/type";

export const useEditeSocial = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Social) => socialApi.update(token, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["socials"],
      });
    },
  });

  return {
    editSocial: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};
