// External imports
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, intervalToDuration } from "date-fns";

// Local constants and functions

// List of languages that use Right-To-Left (RTL) text direction.
const RTL_LANGUAGES = ["ar", "he", "fa", "ur"];

/**
 * Combines multiple class values into a single string using clsx and tailwind-merge.
 *
 * @param {...ClassValue[]} inputs - The class values to combine.
 * @returns {string} The combined class string.
 *
 * @example
 * ```ts
 * cn('p-4', 'text-center', isActive && 'bg-blue-500');
 * ```
 */
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
 * @returns {number} The local time zone's offset from UTC in hours.
 *
 * @example
 * ```ts
 * const offset = getTimeZoneOffsetInHours();
 * console.log(offset); // Output might be 3 for UTC+3
 * ```
 */
export const getTimeZoneOffsetInHours = (): number => {
  const date = new Date();
  const timezoneOffsetInMinutes = date.getTimezoneOffset();
  const timezoneOffsetInHours = -timezoneOffsetInMinutes / 60;

  return timezoneOffsetInHours;
};

/**
 * Determines the text direction (RTL or LTR) based on the given locale.
 *
 * @param {string} locale - The locale identifier (e.g., 'en', 'ar').
 * @returns {'rtl' | 'ltr'} The text direction ('rtl' for right-to-left, 'ltr' for left-to-right).
 *
 * @example
 * ```ts
 * const direction = getDirection('ar');
 * console.log(direction); // Output: 'rtl'
 * ```
 */
export function getDirection(locale: string): "rtl" | "ltr" {
  return RTL_LANGUAGES.includes(locale) ? "rtl" : "ltr";
}

/**
 * Converts a File object to a URL string using URL.createObjectURL.
 *
 * @param {File | undefined} file - The File object to convert to a URL.
 * @returns {string} The URL string representing the File object.
 *
 * @example
 * ```ts
 * const fileUrl = convertFileToURL(file);
 * console.log(fileUrl); // Output: 'blob:http://...'
 * ```
 */
export const convertFileToURL = (file: File | undefined): string => {
  if (!file) return "";
  const url = URL.createObjectURL(file);
  return url;
};

/**
 * Calculates the distance from the given date and time to now in a human-readable format.
 *
 * @param {string} date - The date string in the format 'YYYY-MM-DD'.
 * @param {string} time - The time string in the format 'HH:mm:ss'.
 * @returns {string} The distance from the given date and time to now in a human-readable format.
 *
 * @example
 * ```ts
 * const distance = getDistanceToNow('2024-08-01', '12:00:00');
 * console.log(distance); // Output: '3 days ago'
 * ```
 */
export function getDistanceToNow(date: string, time: string): string {
  const dateTimeString = `${date}T${time}`;
  const parsedDate = new Date(dateTimeString);
  return formatDistanceToNow(parsedDate, { addSuffix: true });
}

/**
 * Extracts URLs from a given string content and splits the content based on the URLs.
 *
 * @param {string} content - The input string containing potential URLs.
 * @returns {object} An object containing two arrays: `parts` (non-URL text segments) and `urls` (extracted URLs).
 *
 * @example
 * ```ts
 * const { parts, urls } = extractContentWithLinks('Check this link: http://example.com');
 * console.log(parts, urls); // Output: ['Check this link: ', ''], ['http://example.com']
 * ```
 */
export const extractContentWithLinks = (content: string) => {
  const urlRegex =
    /(?:https?:\/\/)?(?:localhost:\d{1,5}|(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)(?:[\/?][^\s]*)?/g;

  const parts = content.split(urlRegex);
  const urls = content.match(urlRegex) || []; // Ensure urls is not null
  return { parts, urls };
};

/**
 * Formats a 24-hour time into a 12-hour format with 'am' or 'pm' suffix.
 *
 * @param {number} hour - The hour to format (0-23).
 * @returns {string} The formatted time string in 12-hour format.
 *
 * @example
 * ```ts
 * const formattedTime = formatTo12Hour(14);
 * console.log(formattedTime); // Output: '2 pm'
 * ```
 */
export function formatTo12Hour(hour: number): string {
  const suffix = hour >= 12 ? "pm" : "am";
  const formattedHour = hour % 12 || 12; // Converts 0 to 12 for midnight and adjusts other hours
  return `${formattedHour} ${suffix}`;
}

/**
 * Determines the appropriate text color ('white' or 'black') based on the contrast
 * of the provided hexadecimal color value.
 * @param {string} hex - The hexadecimal color value (e.g., '#RRGGBB') to evaluate.
 * @returns 'white' if the contrast is high, 'black' if the contrast is low.
 */
export function getContrastTextColor(hex: string): "white" | "black" {
  // Remove the hash symbol if present
  const cleanHex = hex.replace("#", "");

  // Convert the hex string into RGB values
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Calculate the brightness of the color using the luminance formula
  // Formula: (0.299 * R) + (0.587 * G) + (0.114 * B)
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  // Return 'black' if the brightness is higher than 186 (or any threshold), else 'white'
  return brightness > 186 ? "black" : "white";
}

/**
 * Convert a time duration in seconds to a human-readable format.
 * @param {number} seconds - The time duration in seconds.
 * @returns {string} A human-readable string (e.g., "about 10 hr", "about 15 min", "5 sec").
 */
export function formatTime(seconds: number): string {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  if (duration.days && duration.days > 0) {
    return `about ${duration.days} day${duration.days > 1 ? "s" : ""}`;
  }
  if (duration.hours && duration.hours > 0) {
    return `about ${duration.hours} hr${duration.hours > 1 ? "s" : ""}`;
  }
  if (duration.minutes && duration.minutes > 0) {
    return `about ${duration.minutes} min${duration.minutes > 1 ? "s" : ""}`;
  }
  return `${duration.seconds} sec`;
}

/**
 * Convert seconds to a duration object in days, hours, minutes, and seconds.
 * @param {number} seconds - The time duration in seconds.
 * @returns {object} A duration object with days, hours, minutes, and seconds.
 */
export function getDuration(seconds: number) {
  return intervalToDuration({ start: 0, end: seconds * 1000 });
}

/**
 * Convert seconds into a readable duration, showing only the largest unit.
 * Example: "2 hr" for 2 hours, or "5 sec" for 5 seconds.
 * @param {number} seconds - The time duration in seconds.
 * @returns {string} The human-readable duration string.
 */
export function formatLargestUnit(seconds: number): string {
  const duration = getDuration(seconds);

  if (duration.days && duration.days > 0)
    return `${duration.days} day${duration.days > 1 ? "s" : ""}`;
  if (duration.hours && duration.hours > 0)
    return `${duration.hours} hr${duration.hours > 1 ? "s" : ""}`;
  if (duration.minutes && duration.minutes > 0)
    return `${duration.minutes} min${duration.minutes > 1 ? "s" : ""}`;
  return `${duration.seconds} sec`;
}
