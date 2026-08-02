import { useQuery } from "@tanstack/react-query";
import { transactionApi } from "..";

export const useTransactions = (token: string) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => transactionApi.getAll(token),
    select: (data) => ({
      transactions: data.results,
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
      },
    }),
  });
};
