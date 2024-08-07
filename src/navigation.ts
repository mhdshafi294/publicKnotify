import { createSharedPathnamesNavigation } from "next-intl/navigation";

// Define the supported locales
export const locales = ["en", "ar"] as const;

// Set the locale prefix strategy
export const localePrefix = "always"; // Default

// Create shared pathnames navigation with defined locales and locale prefix
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
