import { forwardRef } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Plus } from "lucide-react";

import { cn, extractContentWithLinks } from "@/lib/utils";
import ChatMessageDate from "./chat-message-date";
import MessageImageBox from "./message-image-box";

/**
 * MessageImagesBox Component
 *
 * This component is responsible for rendering a collection of images within a chat message.
 * It uses the `react-photo-view` for image previewing and applies conditional rendering based on the
 * number of images. It supports cases where there are up to 4 images visible, with a "plus" icon
 * indicating additional hidden images.
 *
 * @param {boolean} isSender - Indicates whether the message is sent by the current user.
 * @param {string[]} images - Array of image URLs.
 * @param {string | null} content - The text content of the message (optional).
 * @param {boolean} isSending - Flag to show if the message is still in the process of being sent.
 * @param {string} messageDate - The date of the message.
 * @returns {JSX.Element | null} The rendered component displaying the images, or null if no images are present.
 */
type PropsType = {
  isSender: boolean;
  images: string[];
  content: string | null;
  isSending: boolean;
  messageDate: string;
};

// The MessageImagesBox component is wrapped with forwardRef for ref forwarding
const MessageImagesBox = forwardRef<HTMLDivElement, PropsType>(
  ({ images, isSender, content, isSending, messageDate }, ref) => {
    // Return null if there are no images
    if (images.length === 0) return null;

    // If there are 1 to 3 images, render each individually
    if (images.length >= 1 && images.length <= 3) {
      return images.map((image, index) => (
        <MessageImageBox
          key={index}
          isSending={isSending}
          messageDate={messageDate}
          ref={ref}
          isSender={isSender}
          content={index === images.length - 1 ? content : ""}
          image={image}
        />
      ));
    }

    let parts: string[] = [];
    let urls: [] | RegExpMatchArray = [];

    if (content) {
      const spearated = extractContentWithLinks(content);
      parts = spearated.parts;
      urls = spearated.urls;
    }

    // For 4 or more images, render them in a grid format
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
              ? "col-start-2 bg-primary rounded-ee-none text-primary-foreground"
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
                    {/* Display a plus icon and the number of hidden images if there are more than 4 */}
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
          {/* Display content if available */}
          {content && parts ? (
            <p className="whitespace-break-spaces overflow-x-auto w-full font-Almarai text-sm mt-3">
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
          {/* Display message date and status */}
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
