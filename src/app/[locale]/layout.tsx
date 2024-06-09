import type { Metadata } from "next";
import { Inter as FontSans, Lato } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryClientProvider";
import { NextIntlClientProvider } from "next-intl";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontLato = Lato({
  weight: ["300", "400", "700", "900", "100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    return null;
  }
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages(locale);

  if (!messages) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={cn("min-h-screen antialiased", fontLato.className)}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <QueryProvider>{children}</QueryProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
      <Toaster />
    </html>
  );
}
