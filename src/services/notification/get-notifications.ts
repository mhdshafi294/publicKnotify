import axiosInstance from "@/lib/axios.config";
import { NOTIFICATION } from "@/lib/apiEndPoints";
import { NotificationsResponse } from "@/types/notification";

const getNotifications = async ({
  count,
  search,
  page,
  type,
}: {
  count: string;
  search?: string;
  page: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<NotificationsResponse>(
    `/${type}${NOTIFICATION}`,
    {
      params: {
        count,
        search,
        page,
      },
    }
  );
  return data;
};

export default getNotifications;
