import { useQuery } from "@tanstack/react-query";
import { memberApi } from "..";

export const useMember = (token: string) => {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await memberApi.getAll(token);
      return res.data;
    },
  });
};
