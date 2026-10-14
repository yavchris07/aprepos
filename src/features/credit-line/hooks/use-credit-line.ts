import { useQuery } from "@tanstack/react-query";
import { creditLineApi } from "..";


export const useCreditlines = (token: string, page: number) => {
  return useQuery({
    queryKey: ["credits-line", page],

    queryFn: () => creditLineApi.getAll(token, page),

    select: (data) => ({
      creditLines: data.results,
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
      },
    }),
  });
};
