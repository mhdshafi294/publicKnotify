import { LOGIN_URL } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import axios, { AxiosResponse } from "axios";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}
export interface CustomUser {
  id?: number;
  full_name?: string;
  phone?: string;
  image?: string | null;
  access_token?: string;
  type?: string;
}

export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // * When we update the session
      if (trigger === "update" && session?.image) {
        const user: CustomUser = token.user as CustomUser;
        user.image = session?.image;
        console.log("The token is", token);
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "login",
      credentials: {
        phone: {},
        password: {},
        type: {},
      },
      type: "credentials",
      async authorize(credentials, req) {
        const type = credentials?.type;
        const res = await axiosInstance.post(
          `${type}${LOGIN_URL}`,
          credentials
        );
        const response = res.data;
        const user = response?.user;
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
