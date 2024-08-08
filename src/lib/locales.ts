/**
 * Array of available locales for the application.
 */
export const locales = ["en", "ar"] as const;

/**
 * Type definition for a single locale based on the available locales.
 * This type will allow only the values present in the `locales` array.
 */
export type Locale = (typeof locales)[number];
