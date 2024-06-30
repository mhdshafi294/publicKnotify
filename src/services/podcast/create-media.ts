import {
  CREATE,
  METADATA,
  PODCASTS,
  REQUEST,
  UPLOAD_MEDIA_FILE,
} from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const createMedia = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const { data } = await axiosInstance.post<ApiResponse>(
    `/${type}${PODCASTS}${UPLOAD_MEDIA_FILE}`,
    formData
  );
  return data;
};

export default createMedia;
