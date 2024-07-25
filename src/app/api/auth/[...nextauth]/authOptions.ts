import { LOGIN_URL } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}
export interface CustomUser {
  id?: number;
  full_name?: string;
  email?: string;
  phone?: string;
  iso_code?: string;
  image?: string | null;
  access_token?: string;
  type?: string | "user" | "podcaster" | "company";
}

export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) token.user = user;

      if (trigger === "update") {
        const updatedUser = token.user as CustomUser;
        updatedUser.full_name = session?.full_name || updatedUser.full_name;
        updatedUser.email = session?.email || updatedUser.email;
        updatedUser.phone = session?.phone || updatedUser.phone;
        updatedUser.image = session?.image || updatedUser.image;
        updatedUser.iso_code = session?.iso_code || updatedUser.iso_code;
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
