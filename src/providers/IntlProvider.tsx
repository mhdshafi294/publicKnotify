// app/providers/IntlProvider.tsx
"use client";

import React from "react";
import { NextIntlClientProvider } from "next-intl";

// Props type definition for the IntlProvider component
type IntlProviderProps = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
};

/**
 * IntlProvider component that wraps the application with internationalization support.
 *
 * @param {IntlProviderProps} props - The properties passed to the component.
 * @returns {JSX.Element} The wrapped children with internationalization context.
 *
 * @example
 * ```tsx
 * <IntlProvider locale="en" messages={messages}>
 *   <App />
 * </IntlProvider>
 * ```
 */
export function IntlProvider({
  children,
  locale,
  messages,
}: IntlProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
