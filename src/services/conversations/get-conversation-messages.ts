import { CONVERSATIONS, REQUEST, SHOW } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ConversationMessagesResponse } from "@/types/conversation";
import { RequestResponse } from "@/types/request";

const getConversationMessages = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<ConversationMessagesResponse>(
    `/${type}${CONVERSATIONS}/${id}`
  );
  return data;
};

export default getConversationMessages;
