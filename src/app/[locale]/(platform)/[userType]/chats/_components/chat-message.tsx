import { ConversationMessage } from "@/types/conversation";
import React from "react";
import MessageBox from "./message-box";
import { commonImageExtensions } from "@/constant";
import MessageFileBox from "./message-file-box";
import { format, isToday, isYesterday } from "date-fns";
import { useTranslations } from "next-intl";
import MessageImagesBox from "./message-images-box";

type ChatMessageProps = {
  message: ConversationMessage;
  type: string;
  date: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  type,
  date: messageDate,
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
    if (message?.media?.length === 0) return <MessageBox {...setting} />;
    else if (
      message.media.length >= 1 &&
      commonImageExtensions.includes(
        message?.media[0].slice(message?.media[0].lastIndexOf(".") + 1)
      )
    )
      return <MessageImagesBox {...setting} images={message?.media} />;
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
        />
      );
  };
  const date = () => {
    return (
      <div className="w-full flex justify-center items-center">
        <p className="bg-background text-foreground border text-xs px-2 py-1 rounded text-">
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
