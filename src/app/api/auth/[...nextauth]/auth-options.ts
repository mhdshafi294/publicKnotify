// Import necessary modules and types
import { LOGIN_URL } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { fetcher } from "@/lib/fetcher";
import { AxiosError } from "axios";
import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// Define CustomSession interface extending the default session with custom user data
export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

// Define CustomUser interface to include additional user properties
export interface CustomUser {
  id?: number;
  full_name?: string;
  email?: string;
  phone?: string;
  iso_code?: string;
  image?: string | null;
  access_token?: string;
  type?: string | "user" | "podcaster" | "company";
  is_notification_enabled?: boolean;
}

export interface CustomResponse {
  success: boolean;
  message: string;
  user: CustomUser;
}

let appleClientSecret: string | undefined;

if (typeof window === "undefined") {
  // Import only on the server side
  const generateAppleClientSecret = require("@/lib/appleClientSecret").default;
  appleClientSecret = generateAppleClientSecret();
}

// Configure NextAuth options
export const authOptions: AuthOptions = {
  callbacks: {
    // Handle JWT callbacks to include custom user data and handle session updates
    async jwt({ token, user, trigger, session, account }) {
      // If there is a user object, attach it to the token
      if (user) {
        token.user = user;
        token.access_token = user.access_token;
      }

      // Handle session updates
      if (trigger === "update") {
        const updatedUser = token.user as CustomUser;
        updatedUser.full_name = session?.full_name || updatedUser.full_name;
        updatedUser.email = session?.email || updatedUser.email;
        updatedUser.phone = session?.phone || updatedUser.phone;
        updatedUser.image = session?.image || updatedUser.image;
        updatedUser.iso_code = session?.iso_code || updatedUser.iso_code;
        updatedUser.is_notification_enabled =
          session?.is_notification_enabled ||
          updatedUser.is_notification_enabled;
      }

      if (account) {
        if (account.provider === "google") {
          const googleToken = account.access_token;
          try {
            console.log("Google token received:", googleToken ? "Token present" : "No token");

            const response = await fetcher<CustomResponse>(
              "/login/google",
              "en",
              {
                method: "POST",
                body: JSON.stringify({
                  token: googleToken,
                  provider: "google",
                }),
              }
            );

            console.log("Full API response:", JSON.stringify(response, null, 2));

            if (response.ok && response.data && response.data.user) {
              console.log("Google login successful:", response.data);
              // Update token with user data
              token.user = response.data.user;
              token.access_token = response.data.user.access_token;
            } else {
              console.error(
                "Google auth failed:",
                response.status,
                response.error
              );
              throw new Error(
                `Google authentication failed: ${response.status}`
              );
            }
          } catch (error) {
            console.error("Error in Google authentication:", error);
            throw error;
          }
        }
      }

      return token;
    },

    // Handle session callbacks to include custom user data in the session
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      if (token.user) {
        session.user = token.user as CustomUser;
      }
      return session;
    },

    // Add redirect callback to handle the post-authentication redirect
    async redirect({ url, baseUrl }) {
      // If the url starts with the base url, allow it
      if (url.startsWith(baseUrl)) return url;
      // If it's an absolute URL with a different domain, redirect to the home page
      if (url.startsWith("http")) return baseUrl;
      // Otherwise, prefix with the base URL
      return new URL(url, baseUrl).toString();
    },
  },

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  cookies: {
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: appleClientSecret!,
      authorization: {
        params: {
          scope: "name email",
          response_mode: "form_post",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "login",
      credentials: {
        phone: {},
        password: {},
        type: {},
        agent: {},
      },
      type: "credentials",
      // Authorize the user with credentials
      async authorize(credentials, req) {
        const type = credentials?.type;

        if (!type) {
          throw new Error("User type is required");
        }

        try {
          // Log the request data to see what is being sent
          console.log("Sending request with credentials:", credentials);

          const res = await axiosInstance.post(
            `${type}${LOGIN_URL}`,
            credentials
          );
          console.log("Response from login API:", res.data); // Log the full response for debugging

          const user = res.data?.user;

          if (user) {
            console.log(user);
            return {
              ...user, // Ensure all user data is returned, including access_token
            };
          } else {
            console.error("User data not found in response.");
            return null;
          }
        } catch (error) {
          // Handling Axios-specific errors and throwing appropriate error messages
          if (error instanceof AxiosError) {
            if (error.response) {
              console.error("API Response Error:", error.response.data);
              switch (error.response.status) {
                case 400:
                  throw new Error("Email or password is incorrect");
                case 401:
                  throw new Error("Unauthorized: Invalid credentials");
                case 434:
                  throw new Error("434 Error");
                default:
                  throw new Error(
                    `Unexpected error occurred: ${
                      error.response.data.message || "Unknown"
                    }`
                  );
              }
            }
          }

          // Log any unknown errors
          console.error("Unknown error during authorization:", error);
          throw new Error(
            "An unexpected error occurred during the authentication process."
          );
        }
      },
    }),
  ],
};
