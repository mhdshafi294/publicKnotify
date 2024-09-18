"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

import { Conversation } from "@/types/conversation";
import ConversationCard from "./conversation-card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import useChatStore from "@/store/conversations/use-chat-store";
import { usePusher } from "@/hooks/usePusher";
import { useRouter } from "@/navigation";
import { lastIndexOf } from "lodash";

/**
 * ConversationsList Component
 *
 * This component renders a list of conversations and updates in real-time using Pusher for chat updates.
 * It also manages the chat's state and displays an empty state message when no conversations are available.
 *
 * @param {Conversation[]} initialConversationsList - Initial list of conversations to display.
 * @param {string} type - The user type (e.g., podcaster, user).
 * @param {Object} searchParams - Query parameters from the URL, including conversation_id.
 * @returns {JSX.Element} The rendered conversation list component.
 */
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

  // Ensure that the component mounts only on the client
  useEffect(() => {
    if (!mounted) {
      isMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set conversation ID based on the searchParams
  useEffect(() => {
    if (searchParams.conversation_id !== undefined) {
      setConversationId(+searchParams.conversation_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.conversation_id]);

  // Initialize Pusher to subscribe to conversation events for real-time updates
  const { pusherClient } = usePusher(
    `private-${session?.user?.type}.conversations.${session?.user?.id}`
  );

  useEffect(() => {
    const channel = pusherClient?.subscribe(
      `private-${session?.user?.type}.conversations.${session?.user?.id}`
    );

    if (!channel) return;

    const handleUpdatedConversation = (pusherNewConversation: any) => {
      const isSelfSender =
        session?.user?.id === pusherNewConversation?.sender_id &&
        pusherNewConversation?.sender_type
          ?.toLowerCase()
          ?.slice(pusherNewConversation?.sender_type.lastIndexOf("/") + 1)
          .includes(session?.user?.type?.toLowerCase());

      const updatedConversation: Conversation = {
        ...pusherNewConversation.conversation,
        id: pusherNewConversation.conversation_id,
        user_id: pusherNewConversation.sender_id,
        user_name: isSelfSender
          ? pusherNewConversation?.conversation?.receiver?.name
          : pusherNewConversation?.conversation?.sender?.name,
        user_image: isSelfSender
          ? pusherNewConversation?.conversation?.receiver?.image
          : pusherNewConversation?.conversation?.sender?.image,
        messages_count:
          pusherNewConversation.conversation_id === conversationId
            ? 0
            : pusherNewConversation.conversation.messages_count
            ? pusherNewConversation.conversation.messages_count + 1
            : 1,
      };

      // const updatedConversation: Conversation | undefined = conversationsList.find(
      //   (conversation) =>
      //     conversation.id === pusherNewConversation.conversation.id
      // )

      // Update the conversation list to reflect real-time changes
      setConversationsList((prevConversationsList) => [
        updatedConversation,
        ...prevConversationsList.filter(
          (conversation) => conversation.id !== updatedConversation.id
        ),
      ]);
    };

    // Subscribe to the `new-message` event in the Pusher channel
    channel.bind("App\\Events\\ActorChat", handleUpdatedConversation);

    // Cleanup event listeners when the component unmounts
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

      {/* Render the list of conversations or show an empty state */}
      {conversationsList.length > 0 ? (
        <ScrollArea className="h-[calc(100%-52px)]">
          <ul className="flex flex-col">
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
          <p className="text-center text-xs opacity-70 dark:opacity-50">
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
