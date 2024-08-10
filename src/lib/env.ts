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

  static FIREBASE_VAPID_KEY: string = process.env.FIREBASE_VAPID_KEY as string;

  static apiKey: string = process.env.apiKey as string;
  static authDomain: string = process.env.authDomain as string;
  static projectId: string = process.env.projectId as string;
  static storageBucket: string = process.env.storageBucket as string;
  static messagingSenderId: string = process.env.messagingSenderId as string;
  static appId: string = process.env.appId as string;
  static measurementId: string = process.env.measurementId as string;
}
