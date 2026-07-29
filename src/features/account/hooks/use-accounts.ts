import { useQuery } from "@tanstack/react-query";
import { accountApi } from "..";

export const useAccounts = (token: string) => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => accountApi.getAll(token),
    select: (data) => ({
      accounts: data.results,
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
      },
    }),
  });
};
