import { useQuery } from "@tanstack/react-query";
import { memberApi } from "..";

export const useMembers = (token: string) => {
  return useQuery({
    queryKey: ["members"],
    queryFn: () => memberApi.getAll(token),
    select: (data) => ({
      members: data.results,
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
      },
    }),
  });
};
