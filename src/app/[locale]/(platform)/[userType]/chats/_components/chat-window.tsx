import { ConversationMessage } from "@/types/conversation";
import React from "react";
import EmptyState from "./empty-state";

const ChatWindow = ({
  searchParams,
  messages,
  type,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  messages: ConversationMessage[];
  type: string;
}) => {
  return (
    <div className="flex-1 px-3 py-5">
      {messages.length === 0 ? (
        <div
          className="
              px-4 
              py-10 
              sm:px-6 
              lg:px-8 
              lg:py-6 
              h-full 
              flex 
              justify-center 
              items-center 
            "
        >
          <div className="text-center items-center flex flex-col gap-3">
            <p className="text-sm opacity-70 ">
              There is no messages in this chat yet
            </p>
            <h3 className="text-2xl font-semibold italic">
              You can start a conversation with this{" "}
              {type === "podcaster" ? "company" : "podcaster"}
            </h3>
          </div>
        </div>
      ) : (
        <h2>Chat Window</h2>
      )}
    </div>
  );
};

export default ChatWindow;
