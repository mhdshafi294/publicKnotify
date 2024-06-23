import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates the time zone offset between the local time zone and Coordinated Universal Time (UTC).
 *
 * This function creates a new Date object to capture the current date and time, then it utilizes
 * the getTimezoneOffset method of the Date object to determine the difference in minutes between
 * the local time zone and UTC. The returned value is in minutes and has the opposite sign of what
 * might be expected (e.g., if local time is UTC+3, the offset is -180 minutes). The function then
 * converts this offset into hours by dividing by 60 and changing its sign to make it more
 * intuitive (e.g., UTC+3 instead of -180 minutes). This adjusted value represents the local
 * time zone's offset from UTC in hours.
 *
 * @return {number} The local time zone's offset from UTC in hours.
 */
export const getTimeZoneOffsetInHours = (): number => {
  const date = new Date();
  const timezoneOffsetInMinutes = date.getTimezoneOffset();
  const timezoneOffsetInHours = -timezoneOffsetInMinutes / 60;

  return timezoneOffsetInHours;
};

// Create a utility function to determine whether the current language is RTL or LTR.
const RTL_LANGUAGES = ["ar", "he", "fa", "ur"];

export function getDirection(locale: string): "rtl" | "ltr" {
  return RTL_LANGUAGES.includes(locale) ? "rtl" : "ltr";
}
