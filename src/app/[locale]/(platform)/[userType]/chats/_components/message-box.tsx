import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import ChatMessageDate from "./chat-message-date";

type PropsType = {
  isSender: boolean;
  messageDate: string;
  isSending: boolean;
  content: string | null;
};

const MessageBox = forwardRef<HTMLDivElement, PropsType>(
  ({ isSender, content, messageDate, isSending }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid mx-3 gap-x-3 py-0.5",
          isSender
            ? "place-items-end grid-cols-[auto_1fr]"
            : "place-items-start grid-cols-[1fr_auto]"
        )}
      >
        <div
          className={cn(
            "w-fit max-w-[90%] md:max-w-[60%] px-4 py-2 rounded-2xl min-h-10 min-w-10",
            isSender
              ? "col-start-2 bg-primary text-background rounded-ee-none"
              : "col-end-2 bg-background border rounded-es-none"
          )}
        >
          <p
            dir="auto"
            className="whitespace-break-spaces overflow-x-auto w-full font-Almarai text-sm"
          >
            {content || ""}
          </p>
          <ChatMessageDate isSending={isSending} messageDate={messageDate} />
        </div>
      </div>
    );
  }
);

// Adding displayName for better debugging and linting support
MessageBox.displayName = "MessageBox";

export default MessageBox;
