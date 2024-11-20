import { ADVERTISING_TYPES, REQUEST } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { AdTypesResponse, RequestResponse } from "@/types/request";

const getAdvertisingTypes = async ({ type }: { type: string }) => {
  const { data } = await axiosInstance.get<AdTypesResponse>(
    `/${type}${REQUEST}${ADVERTISING_TYPES}`
  );
  return data;
};

export default getAdvertisingTypes;
