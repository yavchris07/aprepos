import { useQuery } from "@tanstack/react-query";
import { rateApi } from "..";

export const useRates = (token: string) => {
  return useQuery({
    queryKey: ["rates"],
    queryFn: async () => rateApi.getAll(token),
    select: (data) => ({
      rates: data.results,
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
      },
    }),
  });
};
