import { create } from "zustand";

/**
 * Store Type
 *
 * This defines the types for the store state and actions.
 * It includes properties for the chat session such as user details, conversation ID,
 * message status, and methods to update these properties.
 */
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

/**
 * useChatStore
 *
 * Zustand store to manage chat-related state.
 * It keeps track of the user details, conversation, and message statuses such as
 * whether the user is sending a message, the number of received messages, and
 * if the chat is scrolled to the bottom.
 */
const useChatStore = create<Store>()((set, get) => ({
  // Initial state values
  userName: undefined,
  userImage: undefined,
  conversationId: undefined,
  uuid: undefined,
  firstMessageId: undefined,
  isSendingMessage: false,
  receivedMessages: 0,
  isChatBottom: true,

  // Action to update the chat's scroll position
  setIsChatBottom: (isChatBottom) =>
    set((state) => ({ ...state, isChatBottom })),

  // Action to set the number of received messages
  setReceivedMessages: (receivedMessages) =>
    set((state) => ({ ...state, receivedMessages })),

  // Action to increment the received message count
  incrementReceivedMessages: () =>
    set((state) => ({
      ...state,
      receivedMessages: get().receivedMessages + 1,
    })),

  // Action to set the sending message status
  setIsSendingMessage: (isSendingMessage) =>
    set((state) => ({ ...state, isSendingMessage })),

  // Action to set the first message ID
  setFirstMessageId: (firstMessageId) =>
    set((state) => ({ ...state, firstMessageId })),

  // Action to set the UUID
  setUuid: (uuid) => set((state) => ({ ...state, uuid })),

  // Action to set the conversation ID
  setConversationId: (conversationId) =>
    set((state) => ({ ...state, conversationId })),

  // Action to set the user's name
  setUserName: (userName) => set((state) => ({ ...state, userName })),

  // Action to set the user's image
  setUserImage: (userImage) => set((state) => ({ ...state, userImage })),
}));

export default useChatStore;
