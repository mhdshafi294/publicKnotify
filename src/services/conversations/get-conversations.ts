import { CONVERSATIONS, REQUEST, SHOW } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { RequestResponse } from "@/types/request";

const getConversations = async ({ type }: { type: string }) => {
  const { data } = await axiosInstance.get<RequestResponse>(
    `/${type}${CONVERSATIONS}`
  );
  return data;
};

export default getConversations;
