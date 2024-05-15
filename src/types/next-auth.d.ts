import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: number;
      full_name?: string;
      phone?: string;
      image?: string | null;
      access_token?: string;
      type?: string;
    };
  }

  interface User {
    id?: number;
    full_name?: string;
    phone?: string;
    image?: string | null;
    access_token?: string;
    type?: string;
  }
}
