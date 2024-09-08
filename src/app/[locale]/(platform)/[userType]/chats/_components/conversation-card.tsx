"use client";

import useChatStore from "@/store/conversations/use-chat-store";
import { Conversation } from "@/types/conversation";
import { format, isToday, isYesterday } from "date-fns";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type ConversationCardProps = {
  conversation: Conversation;
};

const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
}) => {
  const t = useTranslations("Index");
  const { setConversationId, setUserImage, setUserName } = useChatStore(
    (state) => state
  );
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect ensures that the code using `window` runs only on the client
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  const goToConversation = () => {
    const currentPath = window.location.pathname; // Safe to use here
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("conversation_id", conversation.id.toString());

    setConversationId(conversation.id);
    setUserImage(conversation.user_image);
    setUserName(conversation.user_name);
    router.push(`${currentPath}?${searchParams.toString()}`);
  };

  return (
    <button
      className="w-full flex gap-5 cursor-pointer px-3 py-2 hover:bg-secondary"
      onClick={goToConversation}
    >
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
      <div className="flex flex-col justify-center gap-2 flex-1">
        <div className="w-full flex justify-between items-center gap-2">
          <h3 className="font-bold text-base text-wrap capitalize">
            {conversation?.user_name}
          </h3>
          {conversation?.last_message?.created_at ? (
            <p className="text-[10px] text-wrap opacity-50">
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
        <p className="text-xs text-wrap opacity-70 text-start">
          {conversation?.last_message?.content}
        </p>
      </div>
    </button>
  );
};

export default ConversationCard;
