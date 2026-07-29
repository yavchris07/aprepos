import { useQuery } from "@tanstack/react-query";
import { kindApi } from "..";

export const useKinds = (token: string) => {
  return useQuery({
    queryKey: ["kinds"],
    queryFn: async () => kindApi.getAll(token),
    select: (data) => ({
      kinds: data.results,
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
      },
    }),
  });
};
