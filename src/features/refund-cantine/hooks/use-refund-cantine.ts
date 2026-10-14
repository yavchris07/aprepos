import { useQuery } from "@tanstack/react-query";
import { refundCantineApi } from "..";

export const useRefundCantine = (token: string, page: number) => {
  return useQuery({
    queryKey: ["refund-cantine", page],

    queryFn: () => refundCantineApi.getAll(token, page),

    select: (data) => ({
      refundCantine: data.results,
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
      },
    }),
  });
};
