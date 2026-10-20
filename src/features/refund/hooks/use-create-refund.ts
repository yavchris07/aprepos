import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refundApi } from "..";
import type { CreatRefundPayload } from "../components/type";

export const useCreateRefund = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreatRefundPayload) => refundApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["refunds"],
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