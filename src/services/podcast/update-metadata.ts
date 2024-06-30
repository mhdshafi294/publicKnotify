import { CREATE, METADATA, PODCASTS, REQUEST } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";
import { MetadataResponse } from "@/types/podcast";

const updateMetadata = async ({
  formData,
  id,
  type,
}: {
  formData: FormData;
  id: string;
  type: string;
}) => {
  const { data } = await axiosInstance.post<MetadataResponse>(
    `/${type}${PODCASTS}${METADATA}/${id}`,
    formData
  );
  return data;
};

export default updateMetadata;
