import { forwardRef } from "react";
import { File } from "lucide-react";

import { cn, extractContentWithLinks } from "@/lib/utils";
import ChatMessageDate from "./chat-message-date";

/**
 * MessageFileBox Component
 *
 * This component is responsible for rendering a downloadable file in a chat message.
 * The file is displayed with a file icon and a truncated name if it exceeds a certain length.
 * It also displays optional text content along with the message date and the sending status.
 *
 * @param {boolean} isSender - Indicates if the message was sent by the current user.
 * @param {string} messageDate - The date and time of the message.
 * @param {boolean} isSending - Indicates whether the message is still being sent.
 * @param {Object} file - The file object containing `name` and `url`.
 * @param {string} file.name - The name of the file.
 * @param {string} file.url - The URL of the file for downloading.
 * @param {string | null} content - Optional text content for the message.
 * @returns {JSX.Element | null} The rendered message file box component.
 */
type PropsType = {
  isSender: boolean;
  messageDate: string;
  isSending: boolean;
  file: {
    name: string;
    url: string;
  };
  content: string | null;
};

// The MessageFileBox component is wrapped with forwardRef for ref forwarding
const MessageFileBox = forwardRef<HTMLDivElement, PropsType>(
  ({ file, isSender, content, isSending, messageDate }, ref) => {
    let parts: string[] = [];
    let urls: [] | RegExpMatchArray = [];

    if (content) {
      const spearated = extractContentWithLinks(content);
      parts = spearated.parts;
      urls = spearated.urls;
    }

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
            "w-fit max-w-[75%] md:max-w-[45%] px-2 py-2 rounded-2xl min-h-10 min-w-10",
            isSender
              ? "col-start-2 bg-primary rounded-ee-none text-primary-foreground"
              : "col-end-2 bg-card rounded-es-none"
          )}
        >
          {/* Link to download the file */}
          <a
            target="_blank"
            href={file.url}
            title={file.name}
            className="flex text-ellipsis justify-start items-center gap-1 border border-transparent rounded-lg p-2 hover:bg-secondary/20 hover:border-primary-foreground"
            rel="noreferrer"
          >
            <File className="size-4" />
            {file.name.length > 25
              ? `${file.name.slice(0, 10)}...${file.name.slice(-10)}`
              : file.name}
          </a>

          {/* Optional message content */}
          {content ? (
            <p className="whitespace-break-spaces overflow-x-auto w-full font-Almarai text-sm">
              {parts.map((part, index) => (
                <span key={index}>
                  {part}
                  {urls[index] && (
                    <a
                      href={urls[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline opacity-90 hover:opacity-100"
                    >
                      {urls[index]}
                    </a>
                  )}
                </span>
              ))}
            </p>
          ) : null}

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
MessageFileBox.displayName = "MessageFileBox";

export default MessageFileBox;
