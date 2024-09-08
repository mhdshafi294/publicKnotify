"use client";

import { ConversationMessage } from "@/types/conversation";
import React from "react";
import MessageBox from "./message-box";
import { commonImageExtensions } from "@/constant";
import MessageFileBox from "./message-file-box";
import { format, isSameDay, isToday, isYesterday } from "date-fns";
import { useTranslations } from "next-intl";
import MessageImagesBox from "./message-images-box";

type ChatMessageProps = {
  message: ConversationMessage;
  previousMessage: ConversationMessage;
  type: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  previousMessage,
  type,
}) => {
  const t = useTranslations("Index");

  const setting = {
    key: message.id,
    isSending: false,
    messageDate: message.created_at,
    isSender: message.is_sender,
    content: message.content,
    // ref:
    //   props.messageRefId && props.messageRefId === message.id
    //     ? props.messageRef
    //     : undefined,
  };
  const msg = () => {
    if (message?.media?.length === 0)
      return <MessageBox {...setting} key={message.id} />;
    else if (
      message.media.length >= 1 &&
      commonImageExtensions.includes(
        message?.media[0].slice(message?.media[0].lastIndexOf(".") + 1)
      )
    )
      return (
        <MessageImagesBox
          {...setting}
          images={message?.media}
          key={message.id}
        />
      );
    else if (
      message.media.length === 1 &&
      !commonImageExtensions.includes(
        message?.media[0].slice(message?.media[0].lastIndexOf(".") + 1)
      )
    )
      return (
        <MessageFileBox
          {...setting}
          file={{
            name: message?.media[0].slice(
              message?.media[0].lastIndexOf("/") + 1
            ),
            url: message?.media[0],
          }}
          key={message.id}
        />
      );
  };
  const date = () => {
    if (
      previousMessage &&
      isSameDay(
        new Date(message.created_at),
        new Date(previousMessage.created_at)
      )
    )
      return null;

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
