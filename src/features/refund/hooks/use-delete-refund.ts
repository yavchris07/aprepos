
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refundApi } from "..";

export const useDeleteRefund = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => refundApi.delete(token, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["refunds"],
      });
    },
  });

  return {
    deleteRefund: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};