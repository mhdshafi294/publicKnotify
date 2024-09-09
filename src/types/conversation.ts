import { ApiResponse, Pagination } from ".";

export type Conversation = {
  id: number;
  user_id: number;
  user_name: string;
  user_image: string;
  messages_count: number;
  last_message: {
    content: null | string;
    media: string[] | null;
    created_at: string | null;
  };
  created_at: string;
  uuid: string | null;
};

export type ConversationMessage = {
  id: number;
  content: string | null;
  media: string[];
  is_sender: boolean;
  seen_at: null | string;
  created_at: string;
};

export type PusherMessage = {
  content: null | string;
  media: string[];
  sender_id: number;
  sender_type: string;
  uuid: string;
  id: number;
  conversation_id: number;
  created_at: string;
};

type TextMessage = {
  type: "text";
  content: string;
  images: [];
  file: null;
};

type ImagesMessage = {
  type: "image";
  images: string[];
  content: string | null;
  file: null;
};

type FileMessage = {
  type: "file";
  file: {
    name: string;
    url: string;
  };
  images: [];
  content: string | null;
};

export type MessageType = TextMessage | ImagesMessage | FileMessage;

export type Message = MessageType & {
  id: number;
  isSender: boolean;
  isSending: boolean;
  createdAt: string;
};

export type SendMessageBody = {
  id: number;
  content?: string;
  files?: File[];
};

export type ReceiverType = {
  id: number;
  full_name: string;
  image: string;
  uuid: string;
};

export type ConversationsResponse = ApiResponse & {
  conversations: Conversation[];
  pagination: Pagination;
};

export type ConversationMessagesResponse = ApiResponse & {
  messages: ConversationMessage[];
  receiver: ReceiverType;
  pagination: Pagination;
};
