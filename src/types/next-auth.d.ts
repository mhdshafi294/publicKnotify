import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: number;
      full_name?: string;
      email?: string;
      phone?: string;
      image?: string | null;
      access_token?: string;
      iso_code?: string;
      type?: string;
    };
  }

  interface User {
    id?: number;
    full_name?: string;
    email?: string;
    phone?: string;
    iso_code?: string;
    image?: string | null;
    access_token?: string;
    type?: string;
  }
}
