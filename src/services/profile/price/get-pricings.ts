import { PRICE } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { PriceApiResponse } from "@/types/profile";

const getPricings = async ({ type }: { type: string }) => {
  const { data } = await axiosInstance.get<PriceApiResponse>(
    `/${type}${PRICE}`
  );
  return data.price;
};

export default getPricings;
