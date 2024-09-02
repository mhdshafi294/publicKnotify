import { CONVERSATIONS, REQUEST, SHOW } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ConversationsResponse } from "@/types/conversation";

const getConversations = async ({ type }: { type: string }) => {
  const { data } = await axiosInstance.get<ConversationsResponse>(
    `/${type}${CONVERSATIONS}`
  );
  return data;
};

export default getConversations;
