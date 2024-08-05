import type { Metadata } from "next";
import { Inter as FontSans, Lato, Noto_Sans_Arabic } from "next/font/google"; // Use Noto Sans Arabic instead of Beiruti
import { notFound } from "next/navigation";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryClientProvider";
import { NextIntlClientProvider } from "next-intl";
import "react-photo-view/dist/react-photo-view.css";
import NotificationProvider from "@/providers/NotificationProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontNotoSansArabic = Noto_Sans_Arabic({
  weight: ["300", "400", "500", "600", "700", "900"],
  subsets: ["arabic"],
  variable: "--font-noto-sans-arabic",
});

const fontLato = Lato({
  weight: ["300", "400", "700", "900"],
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
      <body
        className={cn(
          "min-h-screen antialiased",
          locale === "ar" ? fontNotoSansArabic.className : fontLato.className
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <QueryProvider>
              <NotificationProvider>{children}</NotificationProvider>
              <Toaster />
            </QueryProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
