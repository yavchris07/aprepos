// import { useState } from "react";
// import { authApi } from "..";


// export const useLogout = (token: string) => {

//   const [pending, setPending] = useState(false);
//   const [fail, setFail] = useState("");

//   const logout = async () => {
//     if (pending) return;
//     try {
//       setPending(true);
//       setFail("");
//       const response = await authApi.logout(token);
//       return response;
//     } catch (error) {

//       if (error instanceof Error) {
//         setFail(error.message);
//       } else {
//         setFail(
//           "Une erreur inconnue est survenue"
//         );
//       }
//       throw error;

//     } finally {

//       setPending(false);
//     }
//   };

//   return { logout, pending, fail };
// };


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "..";

export const useLogout = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => authApi.logout(token),

    onSuccess: () => {
      // Vide le cache après la déconnexion
      queryClient.clear();
    },
  });

  return {
    logout: mutation.mutateAsync,
    pending: mutation.isPending,
    fail: mutation.error instanceof Error ? mutation.error.message : "",
    data: mutation.data,
    reset: mutation.reset,
  };
};