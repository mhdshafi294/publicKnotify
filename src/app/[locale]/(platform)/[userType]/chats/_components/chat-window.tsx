/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  FilePlus2Icon,
  HandshakeIcon,
} from "lucide-react";

import {
  ConversationMessage,
  ReceiverType,
  ConversationMessagesResponse,
  PusherMessage,
} from "@/types/conversation";
import { getConversationMessagesAction } from "@/app/actions/conversationsActions";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import useChatStore from "@/store/conversations/use-chat-store";
import { usePusher } from "@/hooks/usePusher";
import { cn } from "@/lib/utils";

import EmptyState from "./empty-state";
import ChatMessage from "./chat-message";
import Loader from "@/components/ui/loader";
import ChatInput from "./chat-input";
import { Link } from "@/navigation";
import { buttonVariants } from "@/components/ui/button";

/**
 * ChatWindow Component
 *
 * This component renders a chat window for users to see their conversation messages.
 * It supports paginated message loading and real-time updates through Pusher.
 * The user can scroll through the chat history and send new messages.
 *
 * @param {Object} searchParams - Query parameters from the URL, includes `conversation_id`.
 * @param {ConversationMessage[]} initialMessages - Initial list of messages to display.
 * @param {ReceiverType} receiver - The recipient of the conversation.
 * @param {string} type - The type of user (e.g., podcaster, user).
 * @returns {JSX.Element} The rendered chat window.
 */
const ChatWindow = ({
  searchParams,
  initialMessages,
  receiver,
  type,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  initialMessages: ConversationMessage[];
  receiver: ReceiverType;
  type: string;
}) => {
  const t = useTranslations("Index");
  const router = useRouter();
  const { data: session } = useSession();

  // State variables for controlling the component's behavior
  const [isMounted, setIsMounted] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [unreadMessagesCounter, setUnreadMessagesCounter] = useState(0);
  const [newMessages, setNewMessages] = useState<ConversationMessage[]>([]); // Real-time messages

  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollableElementRef = useRef<HTMLDivElement>(null);
  const receiveMessageSound = "/audio/receive-message.mp3";

  // State from chat store to manage conversation data
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

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  const conversation_id = searchParams.conversation_id as string | undefined;

  // Handle component mounting
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  // useEffect(() => {
  //   // Add event listener for Escape key
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "Escape") {
  //       closeChat();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     // Cleanup event listener
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  // Set conversation ID, user image, name, and UUID when the conversation ID changes
  useEffect(() => {
    if (conversation_id && !conversationId) {
      setConversationId(+conversation_id);
      setUserName(receiver?.full_name);
      setUserImage(receiver?.image);
      setUuid(receiver?.uuid);
    }
  }, [conversation_id]);

  useEffect(() => {
    if (conversationId) {
      bottomRef?.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [conversationId]);

  // Fetch conversation messages with infinite scrolling
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

  // Scroll to the bottom of the chat when new data is loaded
  useEffect(() => {
    if (data?.pages && data.pages[1] === undefined) {
      bottomRef?.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [data]);

  // Initialize Pusher for real-time messages
  const { pusherClient } = usePusher(
    `private-conversation.${uuid ? uuid : receiver?.uuid}`
  );

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

      // Handle receiving new messages
      if (!newMessage.is_sender || newMessage.media.length > 0) {
        setNewMessages((prevMessages) => [...prevMessages, newMessage]); // Add to new messages
        setUnreadMessagesCounter((prevCounter) => prevCounter + 1);
        if (!newMessage.is_sender) {
          new Audio(receiveMessageSound).play(); // Play sound for new messages
        }
      }
    };

    // Subscribe to real-time message events
    channel.bind("App\\Events\\SendMessage", handleNewMessage);

    // Cleanup event listener when component unmounts
    return () => {
      channel.unbind("App\\Events\\SendMessage", handleNewMessage);
      channel.unsubscribe();
    };
  }, [pusherClient, uuid]);

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (!showScrollToBottom) {
      bottomRef?.current?.scrollIntoView({ behavior: "instant" });
    }
    if (showScrollToBottom && newMessages[newMessages.length - 1]?.is_sender) {
      bottomRef?.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [newMessages]);

  // Reset unread message counter when the user scrolls to the bottom
  useEffect(() => {
    if (!showScrollToBottom) {
      setUnreadMessagesCounter(0);
    }
  }, [showScrollToBottom]);

  // Handle scrolling within the chat
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = scrollableElementRef?.current?.scrollHeight;
      const clientHeight = scrollableElementRef?.current?.clientHeight;
      const scrollTop = scrollableElementRef?.current?.scrollTop;

      if (scrollableElementRef.current) {
        const isAtBottom = scrollHeight! - scrollTop! <= clientHeight! + 100;
        setShowScrollToBottom(!isAtBottom); // Show scroll-to-bottom button if not at the bottom
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

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Close the chat and remove conversation ID from the URL
  const closeChat = () => {
    setConversationId(undefined);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("conversation_id");
    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  // Load more messages when the user scrolls to the bottom
  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
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
        <div className="flex flex-col h-full bg-card-secondary md:rounded-2xl">
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
            <div className="justify-self-end flex justify-end items-center gap-2 ms-auto">
              <Link
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    className: "flex gap-1 items-center",
                  })
                )}
                href={`/${session?.user?.type}/contracts/create`}
              >
                <span>
                  {t("new")} {t("contract")}
                </span>
                <FilePlus2Icon className="size-3" />
              </Link>
              <Link
                className={cn(
                  buttonVariants({
                    variant: "default",
                    className:
                      "flex gap-1 items-center bg-card-foreground text-background hover:bg-card-foreground/80",
                  })
                )}
                href={`/${session?.user?.type}/contracts/?${
                  session?.user?.type === "podcaster"
                    ? "company_id"
                    : "podcaster_id"
                }=${receiver?.id}`}
              >
                <span>{t("contracts")}</span>
                <HandshakeIcon className="size-3" />
              </Link>
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
                            newMessages.length > 1 && index > 0
                              ? newMessages[index - 1]
                              : data?.pages[0]?.messages[0]
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
                      className="col-span-1 mb-20 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
                    >
                      {isFetchingNextPage && <Loader />}
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
                className="absolute bottom-20 right-3 p-3 bg-border-secondary dark:bg-secondary dark:text-white rounded-full shadow-lg "
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
