import { useQuery } from "@tanstack/react-query";
import { kindApi } from "..";

export const useKinds = (token: string) => {
  return useQuery({
    queryKey: ["kinds"],
    queryFn: async () => {
      const res = await kindApi.getAll(token);
      return res.data;
    },
  });
};
