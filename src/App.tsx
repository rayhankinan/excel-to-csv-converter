import type { JSX } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import Page from "@/components/app";
import queryClient from "@/utils/query";

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
      <Toaster position="bottom-right" />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}
