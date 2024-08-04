"use server";

import getNotifications from "@/services/notification/get-notifications";

export const getNotificationsAction = async ({
  count = "24",
  search,
  page = "1",
  type,
}: {
  count?: string;
  search?: string;
  page?: string;
  type: string;
}) => {
  return await getNotifications({
    count,
    search,
    page,
    type,
  });
};
