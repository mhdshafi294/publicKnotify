import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Check, Clock } from "lucide-react";
import { FC } from "react";

type PropsType = {
  messageDate: string;
  isSending: boolean;
  isSender: boolean;
};
const ChatMessageDate: FC<PropsType> = ({
  isSending,
  messageDate,
  isSender,
}) => {
  return (
    <p className="text-[10px] pt-0.5 select-none flex justify-end items-center gap-1">
      <span className={cn({ "opacity-60": !isSender })}>
        {format(new Date(messageDate), "hh:mm aa")}
      </span>
      {!isSender ? null : isSending ? (
        <Clock className="size-3" />
      ) : (
        <Check className="size-3" />
      )}
    </p>
  );
};

export default ChatMessageDate;
