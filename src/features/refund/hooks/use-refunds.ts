import { useQuery } from "@tanstack/react-query";
import { refundApi } from "..";

export const useRefunds = (token: string) => {
  return useQuery({
    queryKey: ["refunds"],
    queryFn: async () => {
      const res = await refundApi.getAll(token);
      return res.data;
    },
  });
};
