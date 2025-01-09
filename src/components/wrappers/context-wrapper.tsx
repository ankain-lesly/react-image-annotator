import { ContextProvider } from "../../store/context-provider";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: ReactNode;
}

export default function ContextWrapper({ children }: Props) {
  // Query Client
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>{children}</ContextProvider>
      </QueryClientProvider>
    </>
  );
}
