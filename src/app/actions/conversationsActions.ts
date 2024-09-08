"use server";

import getConversationMessages from "@/services/conversations/get-conversation-messages";
import getConversations from "@/services/conversations/get-conversations";
import storeMessage from "@/services/conversations/store-message";

export const getConversationsAction = async ({ type }: { type: string }) => {
  const getConversationsResponse = await getConversations({
    type,
  });
  return getConversationsResponse;
};

export const getConversationMessagesAction = async ({
  page = "1",
  count = "50",
  id,
  type,
}: {
  page?: string;
  count?: string;
  id: string;
  type: string;
}) => {
  const getConversationMessagesResponse = await getConversationMessages({
    page,
    count,
    id,
    type,
  });
  return getConversationMessagesResponse;
};

export const storeMessageAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const storeMessageResponse = await storeMessage({ formData, type });
  return storeMessageResponse;
};
