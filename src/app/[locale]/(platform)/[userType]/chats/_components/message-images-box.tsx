import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { forwardRef } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ChatMessageDate from "./chat-message-date";
import MessageImageBox from "./message-image-box";

type PropsType = {
  isSender: boolean;
  images: string[];
  content: string | null;
  isSending: boolean;
  messageDate: string;
};
const MessageImagesBox = forwardRef<HTMLDivElement, PropsType>(
  ({ images, isSender, content, isSending, messageDate }, ref) => {
    if (images.length === 0) return null;
    if (images.length >= 1 && images.length <= 3)
      return images.map((image, index) => (
        <MessageImageBox
          isSending={isSending}
          messageDate={messageDate}
          ref={ref}
          key={index}
          isSender={isSender}
          content={index === images.length - 1 ? content : ""}
          image={image}
        />
      ));
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
            "w-fit max-w-[90%] xl:max-w-[40%] cursor-pointer px-2 py-2 rounded-2xl min-h-10 min-w-10",
            isSender
              ? "col-start-2 bg-primary rounded-ee-none"
              : "col-end-2 bg-card rounded-es-none"
          )}
        >
          <div className="grid grid-cols-2 grid-rows-2 justify-items-center gap-1">
            <PhotoProvider maskOpacity={0.5}>
              {images.map((image, index) => (
                <PhotoView key={index + image} src={image}>
                  <div
                    className={cn(
                      "size-28 md:size-36 relative",
                      index === 3 &&
                        images.length > 4 &&
                        "bg-black/50 rounded-xl",
                      index > 3 && "hidden"
                    )}
                  >
                    {index === 3 && images.length > 4 ? (
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex justify-center items-center text-white">
                        <Plus className="text-white size-4" />
                        <span className="text-xl">{images.length - 4}</span>
                      </div>
                    ) : null}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="object-cover size-full rounded-lg"
                      src={image}
                      alt="image"
                    />
                  </div>
                </PhotoView>
              ))}
            </PhotoProvider>
          </div>
          {content ? (
            <p className="whitespace-break-spaces overflow-x-auto w-full font-Almarai text-sm mt-1">
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
MessageImagesBox.displayName = "MessageImagesBox";

export default MessageImagesBox;
