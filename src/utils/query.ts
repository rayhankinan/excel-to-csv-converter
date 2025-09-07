import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: "always",
      staleTime: 0,
      gcTime: 0,
    },
  },
});

export default queryClient;
