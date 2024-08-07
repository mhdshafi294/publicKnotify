"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

/**
 * QueryProvider component that wraps its children with the QueryClientProvider from react-query.
 *
 * @param {object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components to be wrapped by the QueryClientProvider.
 * @returns {JSX.Element} The QueryClientProvider component wrapping its children.
 *
 * @example
 * ```tsx
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * ```
 */
export default function QueryProvider({ children }: { children: ReactNode }) {
  // Initialize the QueryClient with default options
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
