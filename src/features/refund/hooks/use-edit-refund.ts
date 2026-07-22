
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refundApi } from "..";
import type { Refund } from "../../../utlis/type";

export const useEditeRefund = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Refund) => refundApi.update(token, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["refunds"],
      });
    },
  });

  return {
    editRefund: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};
