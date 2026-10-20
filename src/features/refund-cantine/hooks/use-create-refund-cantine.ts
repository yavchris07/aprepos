import { useMutation, useQueryClient } from "@tanstack/react-query";
// import type { Member } from "../../../utlis/type";
import { refundCantineApi } from "..";
import type { RefundCantinePayload } from "../type";

export const useCreateRefundCantine = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: RefundCantinePayload) => refundCantineApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["refund-cantine"],
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