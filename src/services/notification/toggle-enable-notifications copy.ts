import axiosInstance from "@/lib/axios.config";
import { NOTIFICATION, TOGGLE } from "@/lib/apiEndPoints";
import { ApiResponse } from "@/types";

const toggleEnableNotifications = async ({
  device_token,
  agent,
  type,
}: {
  device_token: string;
  agent?: string;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${NOTIFICATION}${TOGGLE}`,
    {
      device_token,
      agent: agent || "chrome",
    }
  );
  return data;
};

export default toggleEnableNotifications;
