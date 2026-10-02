import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateProductPayload } from "../../../utlis/type";
import { productApi } from "..";

export const useCreateProduct = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateProductPayload) => productApi.create(data, token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
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