import { REQUEST, SHOW } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { RequestResponse } from "@/types/request";

const getRequest = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.get<RequestResponse>(
    `/${type}${REQUEST}${SHOW}/${id}`
  );
  return data;
};

export default getRequest;
