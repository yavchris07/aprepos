import { useQuery } from "@tanstack/react-query";
import { accountApi } from "..";

export const useGetAccount = (token:string, id: number) => {
  const query = useQuery({
    queryKey: ["account", id],
    queryFn: () => accountApi.get(token,id),
    enabled: !!id, // n'exécute la requête que si un id existe
  });

  return {
    account: query.data,
    pending: query.isPending,
    fail: query.error instanceof Error ? query.error.message : "",
    refetch: query.refetch,
  };
};