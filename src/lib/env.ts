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
}
