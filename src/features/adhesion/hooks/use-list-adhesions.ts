import { useQuery } from "@tanstack/react-query";
import { adhesionApi } from "..";

export const useListAdhesions = (token: string) => {
  return useQuery({
    queryKey: ["list-accounts"],
    
    queryFn: async () => {
      const res = await adhesionApi.adhesions(token);
      return res;
    },
  });
};