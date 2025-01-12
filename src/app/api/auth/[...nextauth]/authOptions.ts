// Import necessary modules and types
import { LOGIN_URL } from "@/lib/apiEndPoints";
import generateAppleClientSecret from "@/lib/appleClientSecret";
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

// Configure NextAuth options
export const authOptions: AuthOptions = {
  callbacks: {
    // Handle JWT callbacks to include custom user data and handle session updates
    async jwt({ token, user, trigger, session, account }) {
      // If there is a user object, attach it to the token
      if (user) {
        token.user = user;
        token.access_token = user.access_token; // Ensure access_token is in the token
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
            const response = await fetcher<CustomUser>("/login/google", "en", {
              method: "POST",
              body: JSON.stringify({ token: googleToken }),
            });
            if (response.ok && response.data) {
              token.user = response.data;
            }
          } catch (error) {
            console.error("Error verifying Google token:", error);
          }
        } else if (account.provider === "apple") {
          const idToken = account.id_token;
          try {
            const response = await fetcher<CustomUser>("/login/apple", "en", {
              method: "POST",
              body: JSON.stringify({ token: idToken }),
            });
            if (response.ok && response.data) {
              token.user = response.data;
            }
          } catch (error) {
            console.error("Error verifying Apple token:", error);
          }
        }
      }

      return token;
    },
    // Handle session callbacks to include custom user data in the session
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
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
      clientSecret: generateAppleClientSecret(),
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
