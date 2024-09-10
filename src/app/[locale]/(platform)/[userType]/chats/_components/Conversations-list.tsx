"use client";

import {
  Conversation,
  ConversationMessage,
  PusherMessage,
} from "@/types/conversation";
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
  const { setConversationId } = useChatStore((state) => state);
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

  const [conversationsList, setConversationsList] = React.useState<
    Conversation[]
  >(initialConversationsList);

  useEffect(() => {
    if (searchParams.conversation_id !== undefined) {
      setConversationId(+searchParams.conversation_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.conversation_id]);

  // Initialize Pusher to subscribe to conversation events
  const { channel } = usePusher(
    `private-${session?.user?.type}.conversations.${session?.user?.id}`
  );

  // Pusher event handling for real-time updates
  useEffect(() => {
    if (!channel) return;

    const handleUpdatedConversation = (pusherNewConversation: Conversation) => {
      console.log(pusherNewConversation, "<<< pusherNewConversation");
      // setConversationsList((prevConversationsList) => [
      //   pusherNewConversation,
      //   ...prevConversationsList.filter(
      //     (conversation) => conversation.id !== pusherNewConversation.id
      //   ),
      // ]);
    };

    // Subscribe to the `new-message` event in the channel
    channel.bind("App\\Events\\ActorChat", handleUpdatedConversation);

    // Clean up the event listener when the component unmounts
    return () => {
      channel.unbind("App\\Events\\ActorChat", handleUpdatedConversation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  return (
    <div
      className={cn(
        "absolute inset-0 w-full md:relative md:inset-auto md:w-80 bg-card-secondary py-5 rounded-2xl border border-border-secondary"
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

export default ConversationsList;
