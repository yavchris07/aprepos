import { useQuery } from "@tanstack/react-query";
import { accountApi } from "..";

export const useListAccounts = (token: string) => {
  return useQuery({
    queryKey: ["list-accounts"],
    
    queryFn: async () => {
      const res = await accountApi.accounts(token);
      return res;
    },
  });
};