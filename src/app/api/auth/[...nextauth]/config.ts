import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import { CustomSession, CustomUser } from "./types";
import { LOGIN_URL } from "@/lib/apiEndPoints";
import { fetcher } from "@/lib/fetcher";
import axiosInstance from "@/lib/axios.config";
import { AxiosError } from "axios";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      if (user) {
        token.user = user;
        token.access_token = user.access_token;
      }

      if (trigger === "update") {
        const updatedUser = token.user as CustomUser;
        updatedUser.full_name = session?.full_name || updatedUser.full_name;
        updatedUser.email = session?.email || updatedUser.email;
        updatedUser.phone = session?.phone || updatedUser.phone;
        updatedUser.image = session?.image || updatedUser.image;
        updatedUser.iso_code = session?.iso_code || updatedUser.iso_code;
        updatedUser.is_notification_enabled =
          session?.is_notification_enabled || updatedUser.is_notification_enabled;
      }

      if (account) {
        if (account.provider === "google") {
          const googleToken = account.access_token;
          try {
            const response = await fetcher<CustomUser>(
              "/login/google",
              "en",
              {
                method: "POST",
                body: JSON.stringify({ token: googleToken }),
              }
            );
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
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: JWT;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
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
      async authorize(credentials, req) {
        const type = credentials?.type;

        if (!type) {
          throw new Error("User type is required");
        }

        try {
          console.log("Sending request with credentials:", credentials);

          const res = await axiosInstance.post(
            `${type}${LOGIN_URL}`,
            credentials
          );
          console.log("Response from login API:", res.data);

          const user = res.data?.user;

          if (user) {
            console.log(user);
            return {
              ...user,
            };
          } else {
            console.error("User data not found in response.");
            return null;
          }
        } catch (error) {
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

          console.error("Unknown error during authorization:", error);
          throw new Error(
            "An unexpected error occurred during the authentication process."
          );
        }
      },
    }),
  ],
};
