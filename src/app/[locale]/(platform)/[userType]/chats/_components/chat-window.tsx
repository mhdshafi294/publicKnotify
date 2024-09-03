"use client";

import {
  ConversationMessage,
  ConversationMessagesResponse,
} from "@/types/conversation";
import React, { useEffect, useState } from "react";
import EmptyState from "./empty-state";
import { useTranslations } from "next-intl";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversationMessagesAction } from "@/app/actions/conversationsActions";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import useChatStore from "@/store/conversations/use-chat-store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import ChatMessage from "./chat-message";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInput from "./chat-input";

const ChatWindow = ({
  searchParams,
  initialMessages,
  type,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  initialMessages: ConversationMessage[];
  type: string;
}) => {
  const t = useTranslations("Index");
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect ensures that the code using `window` runs only on the client
    if (!isMounted) {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { conversationId, userImage, userName, setConversationId } =
    useChatStore((state) => state);

  // Intersection observer for detecting when to fetch the next page
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0 });

  // Infinite query setup
  const {
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["messages", { type }],
    queryFn: async ({ pageParam = 1 }) => {
      const response: ConversationMessagesResponse =
        await getConversationMessagesAction({
          type,
          id: searchParams.conversation_id as string,
          page: pageParam.toString(),
        });
      return {
        messages: response.messages,
        pagination: {
          ...response.pagination,
          next_page_url: response.pagination.next_page_url,
          prev_page_url: response.pagination.prev_page_url,
        },
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.next_page_url
        ? lastPage.pagination.current_page + 1
        : undefined;
    },
    initialPageParam: 1,
    initialData: () => {
      if (initialMessages) {
        return {
          pages: [
            {
              messages: initialMessages || [],
              pagination: {
                current_page: 1,
                first_page_url: "",
                last_page_url: "",
                next_page_url:
                  initialMessages && initialMessages.length > 0 ? "" : null,
                per_page: 10,
                prev_page_url: null,
                total: initialMessages ? initialMessages.length : 0,
              },
            },
          ],
          pageParams: [1],
        };
      }
    },
  });

  // Effect to fetch next page when intersection observer detects scrolling
  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  const closeChat = () => {
    // Clear the conversation ID in the store
    setConversationId(undefined);

    // Create a new URLSearchParams object from the current search params
    const searchParams = new URLSearchParams(window.location.search);

    // Delete the conversation_id param
    searchParams.delete("conversation_id");

    // Push the new URL with the updated search params
    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="flex-1 px-3 pt-1">
      {!searchParams.conversation_id || !conversationId ? (
        <div className="flex-1 px-3 py-5 flex justify-center items-center">
          <EmptyState />
        </div>
      ) : (
        <div className="flex flex-col gap-5 h-full">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative size-16 rounded-full overflow-hidden">
                <Image
                  fill
                  className="rounded-full object-cover"
                  src={
                    userImage && userImage.length > 0
                      ? userImage
                      : "/contact-avatar.webp"
                  }
                  alt="image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-bold text-base text-wrap capitalize">
                {userName}
              </h3>
            </div>
            <Button variant={"ghost"} size={"icon"} onClick={closeChat}>
              <X />
            </Button>
          </div>
          <div className="w-full flex-1 bg-card-secondary rounded-2xl relative">
            {initialMessages.length === 0 ? (
              <div
                className="
              px-4 
              py-10 
              sm:px-6 
              lg:px-8 
              lg:py-0 
              h-full 
              flex 
              justify-center 
              items-center 
            "
              >
                <div className="text-center items-center flex flex-col gap-3">
                  <p className="text-sm opacity-70 ">
                    {t("there-is-no-messages-in-this-chat-yet")}
                  </p>
                  <h3 className="text-2xl font-semibold italic">
                    {t("you-can-start-a-conversation-with-this")}{" "}
                    {type === "podcaster" ? t("company") : t("podcaster")}
                  </h3>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-0 relative">
                <div
                  ref={ref}
                  className="col-span-1 mt-0.5 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
                >
                  {isFetchingNextPage && <Loader className="size-9" />}
                  <span className="sr-only">{t("loading")}</span>
                </div>
                <ScrollArea className="flex-1 flex flex-col gap-3">
                  {data?.pages.map((page) =>
                    page.messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        type={type}
                        date={message.created_at}
                      />
                    ))
                  )}
                </ScrollArea>
              </div>
            )}
            <ChatInput />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
