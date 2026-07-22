import { useQuery } from "@tanstack/react-query";
import { socialApi } from "..";

export const useSocials = (token: string) => {
  return useQuery({
    queryKey: ["socials"],
    queryFn: async () => {
      const res = await socialApi.getAll(token);
      return res.data;
    },
  });
};
