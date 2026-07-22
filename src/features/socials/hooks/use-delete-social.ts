
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialApi } from "..";

export const useDeleteSocial = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => socialApi.delete(token, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["socials"],
      });
    },
  });

  return {
    deleteSocial: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};