import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Inter as FontSans, Lato, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryClientProvider";
import NotificationProvider from "@/providers/NotificationProvider";
import { ThemeProvider } from "@/providers/theme-provider";

import "react-photo-view/dist/react-photo-view.css";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "@/navigation";

// Font configurations
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

// Metadata for the application
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // authors: [{ name: "Knotify", url: process.env.NEXTAUTH_URL }],
  creator: "R-Link",
  // verification: {
  //   google: "ZYEUDZ7APLY1a_xSZeVWi267waKXpewUtv_3zay8ZaM",
  // },
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
  // twitter: {
  //   card: "summary_large_image",
  // },
};

/**
 * Fetches translation messages for the given locale.
 *
 * @param {string} locale - The locale identifier (e.g., 'en', 'ar').
 * @returns {Promise<object|null>} The translation messages or null if not found.
 */
async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    return null;
  }
}

/**
 * RootLayout component that wraps the application with necessary providers and layout settings.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the layout.
 * @param {object} props.params - The parameters including locale.
 * @param {string} props.params.locale - The locale identifier.
 * @returns {JSX.Element} The root layout component.
 *
 * @example
 * ```tsx
 * <RootLayout params={{ locale: 'en' }}>
 *   <App />
 * </RootLayout>
 * ```
 */
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages(locale);

  const session = await getServerSession(authOptions);

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider session={session}>
              <QueryProvider>
                {/* <NotificationProvider> */}
                {children}
                {/* </NotificationProvider> */}
                <Toaster />
              </QueryProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
