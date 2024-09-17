"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { format, isToday, isYesterday } from "date-fns";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import useChatStore from "@/store/conversations/use-chat-store";
import { Conversation } from "@/types/conversation";

/**
 * ConversationCard Component
 *
 * This component renders a card for an individual conversation in the chat list.
 * It displays the user's image, name, last message, and the date of the last message.
 * If the conversation has unread messages, a message count badge is shown.
 * Clicking on the card navigates to the conversation.
 *
 * @param {Conversation} conversation - The conversation data to display.
 * @param {React.Dispatch<React.SetStateAction<Conversation[]>>} setConversationsList - Function to update the list of conversations.
 * @returns {JSX.Element} The rendered conversation card component.
 */
type ConversationCardProps = {
  conversation: Conversation;
  setConversationsList: React.Dispatch<React.SetStateAction<Conversation[]>>;
};

const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
  setConversationsList,
}) => {
  const t = useTranslations("Index");
  const {
    conversationId,
    setConversationId,
    setUserImage,
    setUserName,
    setUuid,
  } = useChatStore((state) => state);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure that the component only runs on the client
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset the message count for the currently selected conversation
  useEffect(() => {
    if (conversationId === conversation.id) {
      setConversationsList((prevConversationsList) => {
        return prevConversationsList.map((prevConversation) => {
          if (prevConversation.id === conversation.id) {
            return {
              ...prevConversation,
              messages_count: 0,
            };
          }
          return prevConversation;
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  // Navigate to the selected conversation
  const goToConversation = () => {
    const currentPath = window.location.pathname; // Safe to use here
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("conversation_id", conversation.id.toString());

    setConversationId(conversation.id);
    setUserImage(conversation.user_image);
    setUserName(conversation.user_name);
    setUuid(conversation.uuid ? conversation.uuid : undefined);

    // Reset the message count for the selected conversation
    setConversationsList((prevConversationsList) => {
      return prevConversationsList.map((prevConversation) => {
        if (prevConversation.id === conversation.id) {
          return {
            ...prevConversation,
            messages_count: 0,
          };
        }
        return prevConversation;
      });
    });

    router.push(`${currentPath}?${searchParams.toString()}`);
  };

  return (
    <button
      className={cn(
        "w-full  flex gap-5 cursor-pointer px-3 py-2 hover:bg-border dark:hover:bg-secondary relative",
        {
          "dark:bg-secondary bg-border": conversationId === conversation.id,
        }
      )}
      onClick={goToConversation}
    >
      {/* Display the user's image */}
      <div className="relative size-16 rounded-full overflow-hidden">
        <Image
          fill
          className="size-16 rounded-full object-cover"
          src={
            conversation.user_image && conversation.user_image.length > 0
              ? conversation.user_image
              : "/contact-avatar.webp"
          }
          alt="conversation image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Conversation details */}
      <div className="flex flex-col justify-center gap-2 flex-1">
        <div className="w-full flex justify-between items-center gap-2">
          <h3 className="font-bold text-base text-wrap capitalize">
            {conversation?.user_name}
          </h3>
          {conversation?.last_message?.created_at ? (
            <p className="text-[10px] text-wrap text-ellipsis opacity-50 ">
              {isToday(new Date(conversation?.last_message?.created_at))
                ? t("today")
                : isYesterday(new Date(conversation?.last_message?.created_at))
                ? t("yesterday")
                : format(
                    new Date(conversation?.last_message?.created_at),
                    "d MMM yyyy"
                  )}
            </p>
          ) : null}
        </div>

        {/* Last message and unread messages count */}
        <div className="w-full flex justify-between items-center gap-2 ">
          <p className="text-xs text-wrap opacity-70 text-start max-h-12 overflow-hidden truncate max-w-[85%]">
            {conversation?.last_message?.content
              ? conversation?.last_message?.content
              : "file"}
          </p>
          {!!conversation.messages_count && (
            <div className="size-5 flex justify-center items-center bg-primary p-2 rounded-full text-xs">
              {conversation.messages_count}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default ConversationCard;
