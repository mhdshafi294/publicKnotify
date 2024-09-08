import { create } from "zustand";

type Store = {
  userName: string | undefined;
  userImage: string | undefined;
  conversationId: number | undefined;
  uuid: string | undefined;
  firstMessageId: number | undefined;
  isSendingMessage: boolean;
  receivedMessages: number;
  isChatBottom: boolean;
  setIsChatBottom: (isChatBottom: boolean) => void;
  setReceivedMessages: (receivedMessages: number) => void;
  incrementReceivedMessages: () => void;
  setIsSendingMessage: (isSendingMessage: boolean) => void;
  setFirstMessageId: (firstMessageId: number | undefined) => void;
  setUuid: (uuid: string | undefined) => void;
  setConversationId: (conversationId: number | undefined) => void;
  setUserName: (userName: string | undefined) => void;
  setUserImage: (userImage: string | undefined) => void;
};

const useChatStore = create<Store>()((set, get) => ({
  userName: undefined,
  uuid: undefined,
  userImage: undefined,
  conversationId: undefined,
  firstMessageId: undefined,
  isSendingMessage: false,
  receivedMessages: 0,
  isChatBottom: true,
  setIsChatBottom: (isChatBottom) =>
    set((state) => ({ ...state, isChatBottom })),
  setReceivedMessages: (receivedMessages) =>
    set((state) => ({ ...state, receivedMessages })),
  incrementReceivedMessages: () =>
    set((state) => {
      return {
        ...state,
        receivedMessages: get().receivedMessages + 1,
      };
    }),
  setIsSendingMessage: (isSendingMessage) =>
    set((state) => ({ ...state, isSendingMessage })),
  setFirstMessageId: (firstMessageId) =>
    set((state) => ({ ...state, firstMessageId })),
  setUuid: (uuid) => set((state) => ({ ...state, uuid })),
  setConversationId: (conversationId) =>
    set((state) => ({ ...state, conversationId })),
  setUserName: (userName) => set((state) => ({ ...state, userName })),
  setUserImage: (userImage) => set((state) => ({ ...state, userImage })),
}));

export default useChatStore;
