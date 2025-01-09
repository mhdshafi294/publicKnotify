import { ISODateString } from "next-auth";

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
  is_notification_enabled?: boolean;
}
