"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

/**
 * AuthProvider component that wraps its children with the SessionProvider from next-auth.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the SessionProvider.
 * @returns {JSX.Element} The SessionProvider component wrapping its children.
 *
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
