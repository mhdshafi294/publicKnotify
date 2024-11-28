import { PRICE, TOGGLE_STATUS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

const togglePriceStatus = async ({
  type,
  ad_type_id,
}: {
  type: string;
  ad_type_id: string;
}) => {
  const { data } = await axiosInstance.get<ApiResponse>(
    `/${type}${PRICE}${TOGGLE_STATUS}/${ad_type_id}`
  );
  return data;
};

export default togglePriceStatus;
