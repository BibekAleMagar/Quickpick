import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000,
            retry: 3,
            refetchInterval: 10000
        }
    }
})