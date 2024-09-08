import { CONVERSATIONS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ConversationMessagesResponse } from "@/types/conversation";

const getConversationMessages = async ({
  page,
  count,
  id,
  type,
}: {
  page?: string;
  count?: string;
  id: string;
  type: string;
}) => {
  const params: any = {
    page,
    count,
  };

  const { data } = await axiosInstance.get<ConversationMessagesResponse>(
    `/${type}${CONVERSATIONS}/${id}`,
    { params }
  );
  return data;
};

export default getConversationMessages;
