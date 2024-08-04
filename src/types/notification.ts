import { ApiResponse, Pagination } from ".";

export type Notification = {
  id: number;
  title: string;
  body: string;
  seen_at: string | null;
  created_at: string;
};

export type NotificationsResponse = ApiResponse & {
  notifications: Notification[];
  pagination: Pagination;
};
