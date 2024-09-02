"use client";

import { Conversation } from "@/types/conversation";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import ConversationCard from "./conversation-card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type ConversationListProps = {
  initialConversations: Conversation[];
  type: string;
};

const ConversationList: React.FC<ConversationListProps> = ({
  initialConversations,
  type,
}) => {
  const t = useTranslations("Index");

  return (
    <div
      className={cn(
        "absolute inset-0 w-full  md:relative md:inset-auto  md:w-80 bg-card-secondary px-3 py-5 rounded-2xl border border-border-secondary"
      )}
    >
      <h2 className="text-2xl font-bold mb-5">
        {type === "podcaster" ? t("companies") : t("podcasters")}
      </h2>
      {initialConversations.length > 0 ? (
        <ScrollArea className="h-[calc(100%-52px)]">
          <ul className=" flex flex-col">
            {initialConversations.map((conversation) => (
              <li key={conversation?.id}>
                <ConversationCard conversation={conversation!} />
              </li>
            ))}
          </ul>
        </ScrollArea>
      ) : (
        <>
          <p className="text-center text-lg italic mt-20">
            {t("no-conversations-opened-yet")}
          </p>
          <p className="text-center text-xs opacity-50">
            {t(
              "to-start-a-conversation-you-should-have-an-accepted-request-first-then-a-chat-with-the-related-user-will-be-opened-automatically"
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default ConversationList;
