import { useQuery } from "@tanstack/react-query";
import { productApi } from "..";
// import { memberApi } from "..";

export const useProducts = (token: string, page: number) => {
  return useQuery({
    queryKey: ["products", page],

    queryFn: () => productApi.getAll(token, page),

    select: (data) => ({
      products: data.results,
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
      },
    }),
  });
};
