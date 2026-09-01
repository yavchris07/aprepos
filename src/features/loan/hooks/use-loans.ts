import { useQuery } from "@tanstack/react-query";
import { loanApi } from "..";

export const useLoans = (token: string) => {
  return useQuery({
    queryKey: ["loans"],
    queryFn: async () => loanApi.getAll(token),

    select: (data) => ({
      loans: data.results,
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
      },
    }),
  });
};

// queryKey: ["members"],
// queryFn: () => memberApi.getAll(token),
