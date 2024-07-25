import axiosInstance from "@/lib/axios.config";
import { PROFILE } from "@/lib/apiEndPoints";
import { PlaylistsResponse } from "@/types/podcast";
import { ApiResponse } from "@/types";

const updateProfile = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${PROFILE}`,
    formData
  );
  return data;
};

export default updateProfile;
