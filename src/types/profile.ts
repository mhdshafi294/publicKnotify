import { ApiResponse } from ".";

export type User = {
  name: string;
  email: string;
  phone: string;
  image: string;
  company_name: string;
  domain: string;
  notification_count: number;
  unreaded_messages: number;
  enable_notification: 1 | 0 | null;
  created_at: string;
};

export type ProfileResponse = {
  profile: User;
} & ApiResponse;
