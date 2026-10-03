import { useQuery } from "@tanstack/react-query";
import { creditApi } from "..";


export const useCredits = (token: string, page: number) => {
  return useQuery({
    queryKey: ["credits", page],

    queryFn: () => creditApi.getAll(token, page),

    select: (data) => ({
      credits: data.results,
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
      },
    }),
  });
};
