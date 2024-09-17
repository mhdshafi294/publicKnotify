import { forwardRef } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { cn, extractContentWithLinks } from "@/lib/utils";
import { useImageOnLoad } from "@/hooks/use-image-on-load";
import ChatMessageDate from "./chat-message-date";

/**
 * MessageImageBox Component
 *
 * This component displays a single image inside a chat message, along with optional
 * text content and a message date. It also includes logic for loading the image
 * and displaying a placeholder while the image is loading. Users can click on the image
 * to view it in full size using the `PhotoProvider` and `PhotoView` from `react-photo-view`.
 *
 * @param {boolean} isSender - Indicates if the message was sent by the current user.
 * @param {string} messageDate - The date and time of the message.
 * @param {boolean} isSending - Indicates whether the message is still being sent.
 * @param {string} [image] - The image URL to be displayed.
 * @param {string | null} content - Optional text content for the message.
 * @returns {JSX.Element | null} The rendered message image box component.
 */
type PropsType = {
  isSender: boolean;
  messageDate: string;
  isSending: boolean;
  image?: string;
  content: string | null;
};

// The MessageImageBox component is wrapped with forwardRef for ref forwarding
const MessageImageBox = forwardRef<HTMLDivElement, PropsType>(
  ({ image, isSender, content, isSending, messageDate }, ref) => {
    // Hook to handle image loading and determine if the image has finished loading
    const { handleImageOnLoad, isLoaded } = useImageOnLoad();

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
            "w-fit max-w-[80%] md:max-w-[40%] px-2 py-2 rounded-2xl min-h-10 min-w-10",
            isSender
              ? "col-start-2 bg-primary rounded-ee-none text-primary-foreground"
              : "col-end-2 bg-card rounded-es-none"
          )}
        >
          {/* Display the image inside PhotoProvider for image preview functionality */}
          <PhotoProvider maskOpacity={0.5}>
            {image ? (
              <PhotoView src={image}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={cn(
                    "object-contain relative cursor-pointer w-full max-h-[500px] rounded-lg",
                    "before:absolute before:inset-0 before:bg-secondary before:z-10",
                    isLoaded ? "before:hidden" : "before:block" // Show loading overlay until image is fully loaded
                  )}
                  src={image}
                  onLoad={handleImageOnLoad}
                  alt="image"
                />
              </PhotoView>
            ) : null}
          </PhotoProvider>

          {/* If there is additional text content, display it below the image */}
          {content ? (
            <p className="whitespace-break-spaces overflow-x-auto w-full font-Almarai text-sm mt-1">
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
MessageImageBox.displayName = "MessageImageBox";

export default MessageImageBox;
