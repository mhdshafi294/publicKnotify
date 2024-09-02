import { Conversation } from "@/types/conversation";
import Image from "next/image";
import React from "react";

type ConversationCardProps = {
  conversation: Conversation;
};

const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
}) => {
  return (
    <div className="w-full flex gap-5 h-16 ">
      <div className="relative size-16">
        <Image
          fill
          src={
            conversation.user_image && conversation.user_image.length > 0
              ? conversation.user_image
              : "/contact-avatar.webp"
          }
          alt="conversation image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          <h3 className="font-bold text-sm text-greeny text-wrap capitalize">
            {conversation?.user_name}
          </h3>
          <p className="font-bold text-sm text-wrap opacity-50">
            {conversation?.last_message?.created_at}
          </p>
        </div>
        <p className="text-xs text-wrap opacity-70">
          {conversation?.last_message?.content}
        </p>
      </div>
    </div>
  );
};

export default ConversationCard;
