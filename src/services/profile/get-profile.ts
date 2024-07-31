import axiosInstance from "@/lib/axios.config";
import { PROFILE } from "@/lib/apiEndPoints";
import { ProfileResponse } from "@/types/profile";

const getProfile = async ({ type }: { type: string }) => {
  const { data } = await axiosInstance.get<ProfileResponse>(
    `/${type}${PROFILE}`
  );
  return data;
};

export default getProfile;
