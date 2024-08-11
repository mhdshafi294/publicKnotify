import axiosInstance from "@/lib/axios.config";
import { ENABLE, NOTIFICATION } from "@/lib/apiEndPoints";
import { ApiResponse } from "@/types";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";

// const fpPromise = FingerprintJS.load();

const enableNotifications = async ({
  device_token,
  agent,
  type,
}: {
  device_token: string;
  agent?: string;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${NOTIFICATION}${ENABLE}`,
    {
      device_token,
      agent: agent || "chrome",
    }
  );
  return data;
};

export default enableNotifications;
