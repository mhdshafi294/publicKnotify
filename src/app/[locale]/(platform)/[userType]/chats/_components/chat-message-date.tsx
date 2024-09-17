import { FC } from "react";
import { format } from "date-fns";
import { Check, Clock } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * ChatMessageDate Component
 *
 * This component displays the timestamp of a chat message and shows an icon indicating
 * whether the message is still sending or has been successfully sent. If the message is sent
 * by the current user, it shows either a clock icon (while sending) or a check mark (when sent).
 *
 * @param {boolean} isSending - Indicates if the message is still being sent.
 * @param {string} messageDate - The timestamp of the message.
 * @param {boolean} isSender - Indicates if the message was sent by the current user.
 * @returns {JSX.Element} The rendered chat message date component.
 */
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
    <p
      className={cn(
        "text-[10px] pt-0.5 select-none flex justify-end items-center gap-1",
        { "text-primary-foreground": isSender }
      )}
    >
      {/* Display message time with lower opacity for received messages */}
      <span className={cn({ "opacity-60": !isSender })}>
        {format(new Date(messageDate), "hh:mm aa")}
      </span>

      {/* Display sending or sent icon for messages from the sender */}
      {!isSender ? null : isSending ? (
        <Clock className="size-3" />
      ) : (
        <Check className="size-3" />
      )}
    </p>
  );
};

export default ChatMessageDate;
