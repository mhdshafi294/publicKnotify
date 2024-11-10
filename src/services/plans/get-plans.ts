import axiosInstance from "@/lib/axios.config";
import { PLANS } from "@/lib/apiEndPoints";
import { PlansResponse } from "@/types/plan";

const getPalns = async ({ type }: { type: string }) => {
  const { data } = await axiosInstance.get<PlansResponse>(`/${type}${PLANS}`);
  return data;
};

export default getPalns;
