import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import ChatMessageDate from "./chat-message-date";

/**
 * MessageBox Component
 *
 * This component is responsible for rendering a message box in a chat conversation.
 * It displays the content of the message, the date, and the sending status.
 * The appearance of the message box is adjusted based on whether the message
 * is sent by the current user or received.
 *
 * @param {boolean} isSender - Indicates if the message was sent by the current user.
 * @param {string} messageDate - The date and time of the message.
 * @param {boolean} isSending - Indicates whether the message is still being sent.
 * @param {string | null} content - The content of the message.
 * @returns {JSX.Element} The rendered message box component.
 */
type PropsType = {
  isSender: boolean;
  messageDate: string;
  isSending: boolean;
  content: string | null;
};

// The MessageBox component is wrapped with forwardRef for ref forwarding
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
              ? "col-start-2 bg-primary rounded-ee-none"
              : "col-end-2 bg-card rounded-es-none"
          )}
        >
          {/* Display the message content */}
          <p
            dir="auto"
            className="whitespace-break-spaces overflow-x-auto w-full text-sm"
          >
            {content || ""}
          </p>

          {/* Display the message date and whether it is still sending */}
          <ChatMessageDate
            isSending={isSending}
            messageDate={messageDate}
            isSender={isSender}
          />
        </div>
      </div>
    );
  }
);

// Adding displayName for better debugging and linting support
MessageBox.displayName = "MessageBox";

export default MessageBox;
