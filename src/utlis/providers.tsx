import { type ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { ToastProvider } from "../components/customer-toast";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Instance créée via un useState pour éviter de la recréer à chaque re-render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // Recommandé en prod pour éviter les requêtes intempestives
            retry: 1, // Nombre de tentatives en cas d'échec API
            staleTime: 1000 * 60 * 5, // Les données sont considérées "fraîches" pendant 5 min
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastProvider>{children}</ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
