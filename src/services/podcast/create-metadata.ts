import { METADATA, PODCASTS, REQUEST } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { MetadataResponse } from "@/types/podcast";

const createMetadata = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const { data } = await axiosInstance.post<MetadataResponse>(
    `/${type}${PODCASTS}${METADATA}`,
    formData
  );
  return data;
};

export default createMetadata;
