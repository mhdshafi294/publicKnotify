// Importing NextAuth from next-auth
import NextAuth from "next-auth";
// Importing the authentication options from the specified path
import { getAuthOptions } from "./authOptions";

/**
 * Configures NextAuth with the provided authentication options.
 *
 * Exports the configuration for both GET and POST methods.
 */
export async function GET(req: Request) {
  const handler = NextAuth(await getAuthOptions());
  return handler(req);
}

export async function POST(req: Request) {
  const handler = NextAuth(await getAuthOptions());
  return handler(req);
}
