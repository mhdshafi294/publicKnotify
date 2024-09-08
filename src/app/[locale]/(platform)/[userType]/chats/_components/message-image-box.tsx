import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ChatMessageDate from "./chat-message-date";
import { useImageOnLoad } from "@/hooks/use-image-on-load";

type PropsType = {
  isSender: boolean;
  messageDate: string;
  isSending: boolean;
  image?: string;
  content: string | null;
};
const MessageImageBox = forwardRef<HTMLDivElement, PropsType>(
  ({ image, isSender, content, isSending, messageDate }, ref) => {
    const { handleImageOnLoad, isLoaded } = useImageOnLoad();
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
            "w-fit max-w-[80%] md:max-w-[40%] px-2 py-2 rounded-2xl min-h-10 min-w-10",
            isSender
              ? "col-start-2 bg-primary rounded-ee-none"
              : "col-end-2 bg-background border rounded-es-none"
          )}
        >
          <PhotoProvider maskOpacity={0.5}>
            {image ? (
              <PhotoView src={image}>
                <img
                  className={cn(
                    "object-contain relative cursor-pointer w-full max-h-[500px] rounded-lg",
                    "before:absolute before:inset-0 before: bg-secondary before:z-10",
                    isLoaded ? "before:hidden" : "before:block"
                  )}
                  src={image}
                  onLoad={handleImageOnLoad}
                  alt="image"
                />
              </PhotoView>
            ) : null}
          </PhotoProvider>
          {content ? (
            <p className="whitespace-break-spaces overflow-x-auto w-full font-Almarai text-sm">
              {content}
            </p>
          ) : null}
          <ChatMessageDate isSending={isSending} messageDate={messageDate} />
        </div>
      </div>
    );
  }
);

// Adding displayName for better debugging and linting support
MessageImageBox.displayName = "MessageImageBox";

export default MessageImageBox;
