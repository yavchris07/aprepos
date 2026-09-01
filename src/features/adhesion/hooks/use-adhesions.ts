import { useQuery } from "@tanstack/react-query";
import { adhesionApi } from "..";

export const useAdhesion = (token: string,page: number) => {
  return useQuery({
    queryKey: ["adhesions", page],
    queryFn: async () => adhesionApi.getAll(token, page),
    select: (data) => ({
      adhesions: data.results,
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
      },
    }),
  });
};



