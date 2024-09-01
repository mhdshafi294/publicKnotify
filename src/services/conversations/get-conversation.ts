import { CONVERSATIONS, REQUEST, SHOW } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { RequestResponse } from "@/types/request";

const getConversation = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.get<RequestResponse>(
    `/${type}${CONVERSATIONS}/${id}`
  );
  return data;
};

export default getConversation;
