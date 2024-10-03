import axiosInstance from "@/lib/axios.config";
import { PLAYLIST_DISTRIBUTION } from "@/lib/apiEndPoints";
import { ApiResponse } from "@/types";

const createUpdateDistributionLinks = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${PLAYLIST_DISTRIBUTION}`,
    formData
  );
  return data;
};

export default createUpdateDistributionLinks;
