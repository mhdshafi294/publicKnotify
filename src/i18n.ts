// Import necessary modules and functions
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Define supported locales, this can be imported from a shared config
const locales = ["ar", "en"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as string)) notFound();

  // Dynamically import the locale-specific messages
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
