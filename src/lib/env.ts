/**
 * Env class to manage environment variables for the application.
 * This class holds the static properties for API and application URLs.
 *
 * The values are retrieved from the environment variables at build time.
 */
export default class Env {
  /**
   * The base URL for the API.
   */
  static API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;

  /**
   * The base URL for the application.
   */
  static APP_URL: string = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;

  static FIREBASE_API_KEY: string = process.env.FIREBASE_API_KEY as string;
  static FIREBASE_AUTH_DOMAIN: string = process.env
    .FIREBASE_AUTH_DOMAIN as string;
  static FIREBASE_PROJECT_ID: string = process.env
    .FIREBASE_PROJECT_ID as string;
  static FIREBASE_STORAGE_BUCKET: string = process.env
    .FIREBASE_STORAGE_BUCKET as string;
  static FIREBASE_MESSAGING_SENDER_ID: string = process.env
    .FIREBASE_MESSAGING_SENDER_ID as string;
  static FIREBASE_APP_ID: string = process.env.FIREBASE_APP_ID as string;
  static FIREBASE__MEASUREMENT_ID: string = process.env
    .FIREBASE__MEASUREMENT_ID as string;
  static FIREBASE_VAPID_KEY: string = process.env.FIREBASE_VAPID_KEY as string;
}
