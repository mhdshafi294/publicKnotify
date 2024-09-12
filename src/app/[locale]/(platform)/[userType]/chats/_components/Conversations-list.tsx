"use client";

import { Conversation } from "@/types/conversation";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import ConversationCard from "./conversation-card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import useChatStore from "@/store/conversations/use-chat-store";
import { usePusher } from "@/hooks/usePusher";
import { useSession } from "next-auth/react";
import { useRouter } from "@/navigation";

type ConversationListProps = {
  initialConversationsList: Conversation[];
  type: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

const ConversationsList: React.FC<ConversationListProps> = ({
  initialConversationsList,
  type,
  searchParams,
}) => {
  const t = useTranslations("Index");
  const { conversationId, setConversationId } = useChatStore((state) => state);
  const [conversationsList, setConversationsList] = React.useState<
    Conversation[]
  >(initialConversationsList);
  const { data: session } = useSession();
  const router = useRouter();
  const [mounted, isMounted] = React.useState(false);

  useEffect(() => {
    // This effect ensures that the code using `window` runs only on the client
    if (!mounted) {
      isMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchParams.conversation_id !== undefined) {
      setConversationId(+searchParams.conversation_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.conversation_id]);

  // Initialize Pusher to subscribe to conversation events
  const { pusherClient } = usePusher(
    `private-${session?.user?.type}.conversations.${session?.user?.id}`
  );

  // Pusher event handling for real-time updates
  useEffect(() => {
    const channel = pusherClient?.subscribe(
      `private-${session?.user?.type}.conversations.${session?.user?.id}`
    );

    if (!channel) return;

    const handleUpdatedConversation = (pusherNewConversation: any) => {
      const updatedConversation: Conversation = {
        ...pusherNewConversation.conversation,
        messages_count:
          pusherNewConversation.conversation.id === conversationId
            ? 0
            : pusherNewConversation.conversation.messages_count
            ? pusherNewConversation.conversation.messages_count + 1
            : 1,
      };
      // pusherNewConversation.conversation;

      setConversationsList((prevConversationsList) => [
        updatedConversation,
        ...prevConversationsList.filter(
          (conversation) => conversation.id !== updatedConversation.id
        ),
      ]);
    };

    // Subscribe to the `new-message` event in the channel
    channel.bind("App\\Events\\ActorChat", handleUpdatedConversation);

    // Clean up the event listener when the component unmounts
    return () => {
      channel.unbind("App\\Events\\ActorChat", handleUpdatedConversation);
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pusherClient, session?.user]);

  return (
    <div
      className={cn(
        "absolute inset-0 w-full md:relative md:inset-auto md:w-80 bg-card-secondary py-5 md:rounded-2xl border border-border-secondary duration-300 z-10",
        { "max-md:translate-x-[-100%]": conversationId }
      )}
    >
      <h2 className="text-2xl font-bold px-3 mb-5">
        {type === "podcaster" ? t("companies") : t("podcasters")}
      </h2>
      {conversationsList.length > 0 ? (
        <ScrollArea className="h-[calc(100%-52px)]">
          <ul className=" flex flex-col">
            {conversationsList.map((conversation) => (
              <li key={conversation?.id}>
                <ConversationCard
                  conversation={conversation!}
                  setConversationsList={setConversationsList}
                />
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

export default ConversationsList;
