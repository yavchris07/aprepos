import { useQuery } from "@tanstack/react-query";
import { loanApi } from "..";

export const useLoans = (token: string) => {
  return useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await loanApi.getAll(token);
      return res.data;
    },
  });
};
