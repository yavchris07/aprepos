import { useQuery } from "@tanstack/react-query";
import { adhesionApi } from "..";

export const useAdhesion = (token: string) => {
  return useQuery({
    queryKey: ["adhesions"],
    queryFn: async () => {
      const res = await adhesionApi.getAll(token);
      return res.data;
    },
  });
};
