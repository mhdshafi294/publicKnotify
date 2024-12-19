"use client";

import { format, isSameDay, isToday, isYesterday } from "date-fns";
import { useTranslations } from "next-intl";
import React from "react";

import { commonImageExtensions } from "@/constant";
import { ConversationMessage } from "@/types/conversation";
import MessageBox from "./message-box";
import MessageFileBox from "./message-file-box";
import MessageImagesBox from "./message-images-box";

/**
 * ChatMessage Component
 *
 * This component renders an individual message in a chat, including support for text messages,
 * image messages, and file attachments. It handles determining the message type (text, image, or file)
 * and rendering the appropriate component.
 *
 * It also displays the date above the message when the message is from a different day than the previous message.
 *
 * @param {ConversationMessage} message - The current message data to display.
 * @param {ConversationMessage} previousMessage - The previous message in the conversation, used to check if a date label should be displayed.
 * @param {boolean} [isSending=false] - Indicates whether the message is still being sent.
 * @param {string} type - The type of conversation (e.g., podcaster, user).
 * @returns {JSX.Element} The rendered chat message component.
 */
type ChatMessageProps = {
  message: ConversationMessage;
  previousMessage?: ConversationMessage | null | undefined;
  isSending?: boolean;
  type: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  previousMessage,
  isSending = false,
  type,
}) => {
  const t = useTranslations("Index");

  // Common settings for message components
  const setting = {
    key: message?.id,
    isSending,
    messageDate: message.created_at,
    isSender: message.is_sender,
    content: message.content,
  };

  // Determine the type of message to display (text, image, or file)
  const msg = () => {
    if (message?.media?.length === 0) {
      return <MessageBox {...setting} key={message?.id} />;
    } else if (
      message.media.length === 1 &&
      !commonImageExtensions.includes(
        message?.media[0].slice(message?.media[0].lastIndexOf(".") + 1)
      )
    ) {
      return (
        <MessageFileBox
          {...setting}
          file={{
            name: message?.media[0].slice(
              message?.media[0].lastIndexOf("/") + 1
            ),
            url: message?.media[0],
          }}
          key={message?.id}
        />
      );
    } else if (
      message.media.length >= 1 &&
      message.media.every((mediaItem) =>
        commonImageExtensions.includes(
          mediaItem.slice(mediaItem.lastIndexOf(".") + 1)
        )
      )
    ) {
      return (
        <MessageImagesBox
          {...setting}
          images={message?.media}
          key={message?.id}
        />
      );
    } else {
      return message?.media?.map((media, index) =>
        !commonImageExtensions.includes(
          media.slice(media.lastIndexOf(".") + 1)
        ) ? (
          <MessageFileBox
            {...setting}
            key={`${message?.id} ${index}`}
            content={
              index === message?.media?.length - 1 ? message?.content : ""
            }
            file={{
              name: media.slice(media.lastIndexOf("/") + 1),
              url: media,
            }}
          />
        ) : (
          <MessageImagesBox
            {...setting}
            key={`${message?.id} ${index}`}
            content={
              index === message?.media?.length - 1 ? message?.content : ""
            }
            images={[media]}
          />
        )
      );
    }
  };

  // Conditionally render the date between messages from different days
  const date = () => {
    if (
      previousMessage &&
      isSameDay(
        new Date(message.created_at),
        new Date(previousMessage.created_at)
      )
    ) {
      return null;
    }

    return (
      <div className="w-full flex justify-center items-center">
        <p className="bg-card text-card-foreground/80 text-xs px-3 py-1.5 rounded-full">
          {isToday(new Date(message?.created_at))
            ? t("today")
            : isYesterday(new Date(message?.created_at))
            ? t("yesterday")
            : format(new Date(message?.created_at), "d MMM yyyy")}
        </p>
      </div>
    );
  };

  return (
    <div>
      <>{date()}</>
      <>{msg()}</>
    </div>
  );
};

export default ChatMessage;
