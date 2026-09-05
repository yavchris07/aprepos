import { useQuery } from "@tanstack/react-query";
import { memberApi } from "..";

export const useListMembers = (token: string) => {
  return useQuery({
    queryKey: ["list-members"],

    // queryFn: () => memberApi.members(token),

    queryFn: async () => {
      const res = await memberApi.members(token);
      return res;
    },
  });
};
