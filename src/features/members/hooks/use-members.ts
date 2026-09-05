import { useQuery } from "@tanstack/react-query";
import { memberApi } from "..";

export const useMembers = (token: string, page: number) => {
  return useQuery({
    queryKey: ["members", page],

    queryFn: () => memberApi.getAll(token, page),

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
