import { useQuery } from "@tanstack/react-query";
import { socialApi } from "..";

export const useListSocials = (token: string) => {
  return useQuery({
    queryKey: ["list-social"],

    queryFn: async () => {
      const res = await socialApi.socials(token);
      return res;
    },
  });
};
