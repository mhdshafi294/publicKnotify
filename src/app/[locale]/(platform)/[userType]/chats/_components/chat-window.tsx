"use client";

import {
  ConversationMessage,
  ReceiverType,
  ConversationMessagesResponse,
  PusherMessage,
} from "@/types/conversation";
import React, { useEffect, useRef, useState } from "react";
import EmptyState from "./empty-state";
import { useTranslations } from "next-intl";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversationMessagesAction } from "@/app/actions/conversationsActions";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import useChatStore from "@/store/conversations/use-chat-store";
import Image from "next/image";
import { ArrowLeftIcon, ChevronDownIcon } from "lucide-react";
import ChatMessage from "./chat-message";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";
import ChatInput from "./chat-input";
import { usePusher } from "@/hooks/usePusher";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const ChatWindow = ({
  searchParams,
  initialMessages,
  recevier,
  type,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  initialMessages: ConversationMessage[];
  recevier: ReceiverType;
  type: string;
}) => {
  const t = useTranslations("Index");
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [unreadMessagesCounter, setUnreadMessagesCounter] = useState(0);
  const [newMessages, setNewMessages] = useState<ConversationMessage[]>([]); // To track real-time messages
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollableElementRef = useRef<HTMLDivElement>(null);
  const receiveMessageSound = "/audio/receive-message.mp3";

  const { data: session } = useSession();

  const {
    conversationId,
    setConversationId,
    userImage,
    userName,
    uuid,
    setUserImage,
    setUserName,
    setUuid,
  } = useChatStore((state) => state);

  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0 });

  const conversation_id = searchParams.conversation_id as string | undefined;

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (conversation_id && !conversationId) {
      setConversationId(+conversation_id);
      setUserName(recevier?.full_name);
      setUserImage(recevier?.image);
      setUuid(recevier?.uuid);
    }
  }, [conversation_id]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["messages", { type, conversation_id }],
      queryFn: async ({ pageParam = 1 }) => {
        const response: ConversationMessagesResponse =
          await getConversationMessagesAction({
            type,
            id: conversation_id as string,
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
                  next_page_url: initialMessages.length > 0 ? "" : null,
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

  useEffect(() => {
    if (data?.pages && data.pages[1] === undefined) {
      bottomRef?.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [data]);

  // Initialize Pusher to subscribe to conversation events
  const { pusherClient } = usePusher(
    `private-conversation.${uuid ? uuid : recevier?.uuid}`
  );

  // Pusher event handling for real-time updates
  useEffect(() => {
    const channel = pusherClient?.subscribe("private-conversation." + uuid!);

    if (!channel) return;

    const handleNewMessage = (pusherNewMessage: PusherMessage) => {
      const newMessage: ConversationMessage = {
        id: pusherNewMessage.id,
        content: pusherNewMessage.content,
        media: pusherNewMessage.media || [],
        is_sender: pusherNewMessage.sender_type
          .toLocaleLowerCase()
          .includes(session?.user?.type?.toLocaleLowerCase()!),
        seen_at: null,
        created_at: pusherNewMessage.created_at,
      };

      if (!newMessage.is_sender || newMessage.media.length > 0) {
        setNewMessages((prevMessages) => [...prevMessages, newMessage]); // Append new message to the state
        setUnreadMessagesCounter((prevCounter) => prevCounter + 1);
        if (!newMessage.is_sender) {
          new Audio(receiveMessageSound).play();
        }
      }
    };
    // Scroll to the bottom when a new message is received
    // bottomRef?.current?.scrollIntoView({ behavior: "smooth" });

    // Subscribe to the `new-message` event in the channel
    channel.bind("App\\Events\\SendMessage", handleNewMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      channel.unbind("App\\Events\\SendMessage", handleNewMessage);
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pusherClient, uuid]);

  // useEffect(() => {
  //   bottomRef?.current?.scrollIntoView({ behavior: "instant" });
  // }, [newMessages]);

  useEffect(() => {
    if (!showScrollToBottom) {
      bottomRef?.current?.scrollIntoView({ behavior: "instant" });
    }
    if (showScrollToBottom && newMessages[newMessages.length - 1]?.is_sender) {
      bottomRef?.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [newMessages]);

  useEffect(() => {
    if (!showScrollToBottom) {
      setUnreadMessagesCounter(0);
    }
  }, [showScrollToBottom]);

  // Scroll to bottom button functionality for the ScrollArea
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = scrollableElementRef?.current?.scrollHeight;
      const clientHeight = scrollableElementRef?.current?.clientHeight;
      const scrollTop = scrollableElementRef?.current?.scrollTop;
      if (scrollableElementRef.current) {
        const isAtBottom = scrollHeight! - scrollTop! <= clientHeight! + 100;
        setShowScrollToBottom(!isAtBottom); // Show button if user is not at the bottom
        if (isAtBottom) {
          setUnreadMessagesCounter(0);
        }
      }
    };

    if (scrollableElementRef.current) {
      scrollableElementRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableElementRef.current) {
        scrollableElementRef?.current?.removeEventListener(
          "scroll",
          handleScroll
        );
      }
    };
  }, [
    scrollableElementRef?.current?.scrollHeight,
    scrollableElementRef?.current?.clientHeight,
  ]);

  const scrollToBottom = () => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const closeChat = () => {
    setConversationId(undefined);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("conversation_id");
    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  // Effect to trigger loading more messages when the user scrolls to the bottom
  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage(); // Fetch the next page of messages
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingNextPage, hasNextPage, isIntersecting]);

  return (
    <div
      className={cn(
        "absolute inset-0 w-full md:relative md:inset-auto md:flex-1 md:px-3 md:pt-1 duration-300",
        { "max-md:translate-x-[100%]": !conversationId }
      )}
    >
      {!conversation_id || !conversationId ? (
        <div className="flex-1 px-3 py-5 flex justify-center items-center">
          <EmptyState />
        </div>
      ) : (
        <div className="flex flex-col h-full bg-card-secondary md:rounded-2xl ">
          <div className="w-full flex gap-2 items-center bg-card p-4 md:rounded-t-2xl">
            <button onClick={closeChat} className="group p-2">
              <ArrowLeftIcon className="opacity-70 group-hover:opacity-100 duration-200" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative size-12 rounded-full overflow-hidden">
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
          </div>
          <div className="w-full flex-1 relative">
            {initialMessages?.length === 0 ? (
              <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-0 h-full flex justify-center items-center">
                <div className="text-center items-center flex flex-col gap-3">
                  <p className="text-sm opacity-70">
                    {t("there-is-no-messages-in-this-chat-yet")}
                  </p>
                  <h3 className="text-2xl font-semibold italic">
                    {t("you-can-start-a-conversation-with-this")}{" "}
                    {type === "podcaster" ? t("company") : t("podcaster")}
                  </h3>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <div
                  className="h-[calc(100dvh-219px)] md:h-[calc(100dvh-286px)] overflow-y-auto styled-scrollbar"
                  ref={scrollableElementRef} // Attach the ref to the scrollable div inside ScrollArea
                >
                  <div className="h-fit flex flex-col-reverse gap-3">
                    <div ref={bottomRef} />
                    {/* Combine real-time messages and paginated messages */}
                    <div className="flex flex-col w-full gap-3">
                      {newMessages.map((message, index) => (
                        <ChatMessage
                          key={`new-${message.id}`} // Ensure unique key for real-time messages
                          message={message}
                          type={type}
                          isSending={message?.is_sending ? true : false}
                          previousMessage={
                            index > 0
                              ? data?.pages[0]?.messages[index - 1]!
                              : data?.pages[0]?.messages[0]
                              ? data?.pages[0]?.messages[0]
                              : message
                          }
                        />
                      ))}
                    </div>
                    {data?.pages.map((page) =>
                      page.messages.map((message, index) => (
                        <ChatMessage
                          key={message.id}
                          message={message}
                          type={type}
                          previousMessage={page.messages[index + 1]}
                        />
                      ))
                    )}
                    <div
                      ref={ref}
                      className="col-span-1 mt-0.5 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
                    >
                      {isFetchingNextPage && <Loader className="size-9" />}
                      <span className="sr-only">{t("loading")}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <ChatInput
              conversation_id={conversation_id}
              type={type}
              newMessages={newMessages}
              setNewMessages={setNewMessages}
            />
            {showScrollToBottom ? (
              <button
                className="absolute bottom-20 right-3 p-3 bg-secondary text-white rounded-full shadow-lg "
                onClick={scrollToBottom}
              >
                <div
                  className={cn(
                    "absolute bottom-9 right-9 size-7 flex justify-center items-center bg-primary p-2 rounded-full text-xs",
                    { hidden: unreadMessagesCounter === 0 }
                  )}
                >
                  {unreadMessagesCounter}
                </div>
                <ChevronDownIcon className="size-6" />
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
