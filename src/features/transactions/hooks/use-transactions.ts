import { useQuery } from "@tanstack/react-query";
import { transactionApi } from "..";

export const useTransactions = (token: string) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await transactionApi.getAll(token);
      return res.data;
    },
  });
};
