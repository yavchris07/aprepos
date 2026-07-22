import { useQuery } from "@tanstack/react-query";
import { accountApi } from "..";

export const useAccounts = (token: string) => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await accountApi.getAll(token);
      return res.data;
    },
  });
};
