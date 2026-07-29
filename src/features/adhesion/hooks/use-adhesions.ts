import { useQuery } from "@tanstack/react-query";
import { adhesionApi } from "..";

export const useAdhesion = (token: string) => {
  return useQuery({
    queryKey: ["adhesions"],
    queryFn: async () => adhesionApi.getAll(token),
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

