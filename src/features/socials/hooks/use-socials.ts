import { useQuery } from "@tanstack/react-query";
import { socialApi } from "..";

export const useSocials = (token: string) => {
  return useQuery({
    queryKey: ["socials"],
    queryFn: async () => socialApi.getAll(token),
    select: (data) => ({
      socials: data.results,
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
      },
    }),
  });
};
