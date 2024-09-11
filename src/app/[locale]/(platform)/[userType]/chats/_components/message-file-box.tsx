import { cn } from "@/lib/utils";
import { File } from "lucide-react";
import { forwardRef } from "react";
import ChatMessageDate from "./chat-message-date";

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
const MessageFileBox = forwardRef<HTMLDivElement, PropsType>(
  ({ file, isSender, content, isSending, messageDate }, ref) => {
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
              ? "col-start-2 bg-primary rounded-ee-none"
              : "col-end-2 bg-card rounded-es-none"
          )}
        >
          <a
            target="_blank"
            href={file.url}
            title={file.name}
            className="flex text-ellipsis justify-start items-center gap-1 border border-transparent rounded-lg p-2 hover:bg-secondary/20 hover:border-primary-foreground"
          >
            <File className="size-4" />
            {file.name.length > 25
              ? `${file.name.slice(0, 10)}...${file.name.slice(-10)}`
              : file.name}
          </a>
          {content ? (
            <p className="whitespace-break-spaces overflow-x-auto w-full font-Almarai text-sm">
              {content}
            </p>
          ) : null}
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
