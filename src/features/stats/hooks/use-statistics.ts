import { useQuery } from "@tanstack/react-query";
import { statsApi } from "..";
import type { Stats } from "../../../utlis/type";


export const useStats = (token: string) => {
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await statsApi.getAll(token);
      return res;
    },
  });
};