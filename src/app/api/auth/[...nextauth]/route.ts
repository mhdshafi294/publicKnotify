// Importing NextAuth from next-auth/next
import NextAuth from "next-auth/next";
// Importing the authentication options from the specified path
import { authOptions } from "./auth-options";

/**
 * Configures NextAuth with the provided authentication options.
 *
 * Exports the configuration for both GET and POST methods.
 */
const nextAuth = NextAuth(authOptions);

// Exporting nextAuth configuration as GET and POST methods
export { nextAuth as GET, nextAuth as POST };
