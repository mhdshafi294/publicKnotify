/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  FileSymlinkIcon,
  PlusSquareIcon,
  SendHorizontalIcon,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { commonImageExtensions } from "@/constant";
import { cn, convertFileToURL } from "@/lib/utils";
import MessageContentFieltd from "./message-content-fieltd";
import { useImageOnLoad } from "@/hooks/use-image-on-load";

/**
 * ChatImageInputDialog Component
 *
 * This component renders a dialog box for users to preview, add, or remove images/files
 * before sending them in a chat. It also provides an input for adding a message to the media.
 * The component supports multiple file uploads and allows previewing different media types.
 *
 * @param {Function} handleSubmit - Function to handle form submission.
 * @param {Function} handleError - Function to handle form validation errors.
 * @param {boolean} isOpen - Whether the dialog is open or not.
 * @param {Function} setOpen - Function to toggle the dialog's open state.
 * @returns {JSX.Element} The rendered image input dialog component.
 */
const ChatImageInputDialog = ({
  handleSubmit,
  handleError,
  isOpen,
  setOpen,
}: {
  handleSubmit: (data: any) => void;
  handleError: (errors: any) => void;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const t = useTranslations("Index");
  const [mediaIndex, setMediaIndex] = useState(0);
  const { handleImageOnLoad, isLoaded } = useImageOnLoad();
  const form = useFormContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Watch the media array to ensure reactivity
  const mediaArray = form.getValues("media");

  // Handle adding files to the "media" field
  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const currentMedia = form.getValues("media") || [];
      form.setValue("media", [...currentMedia, ...Array.from(files)], {
        shouldValidate: true,
      });
    }
  };

  // Handle removing a file from the media array
  const handleRemoveFile = (index: number) => {
    const updatedMedia = mediaArray.filter((_: any, i: number) => i !== index);
    let newMediaIndex = mediaIndex;

    // Adjust mediaIndex based on the new media array length
    if (updatedMedia.length === 0) {
      newMediaIndex = 0;
    } else if (index === 0 || index >= updatedMedia.length) {
      newMediaIndex = updatedMedia.length - 1;
    } else if (index <= mediaIndex) {
      newMediaIndex = mediaIndex - 1;
    }

    // Update media index and media array in the form
    setMediaIndex(Math.max(newMediaIndex, 0));
    form.setValue("media", updatedMedia, { shouldValidate: true });
  };

  // Open file dialog to select files
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[475px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          {mediaArray.length > 0 ? (
            <DialogTitle>
              {commonImageExtensions.includes(
                mediaArray[mediaIndex]?.name?.slice(
                  mediaArray[mediaIndex]?.name?.lastIndexOf(".") + 1
                )
              )
                ? `${mediaArray.length} ${
                    mediaArray.length > 1 ? "images" : "image"
                  } selected`
                : `${mediaArray.length} ${
                    mediaArray.length > 1 ? "files" : "file"
                  } selected`}
            </DialogTitle>
          ) : null}
        </DialogHeader>

        {mediaArray.length > 0 && (
          <>
            {/* Display media preview (image or file icon) */}
            {mediaArray[mediaIndex]?.name && (
              <>
                {commonImageExtensions.includes(
                  mediaArray[mediaIndex]?.name?.slice(
                    mediaArray[mediaIndex]?.name?.lastIndexOf(".") + 1
                  )
                ) ? (
                  <img
                    className={cn(
                      "object-contain relative cursor-pointer w-full max-h-[400px] rounded-lg",
                      "before:absolute before:inset-0 before: bg-secondary before:z-10",
                      isLoaded ? "before:hidden" : "before:block"
                    )}
                    src={convertFileToURL(mediaArray[mediaIndex])}
                    alt="image"
                  />
                ) : (
                  <FileSymlinkIcon strokeWidth={1} className="w-full h-full " />
                )}
              </>
            )}

            {/* Scrollable media thumbnails */}
            <ScrollArea>
              <div className="w-full flex flex-row-reverse gap-2">
                {mediaArray.map((media: File, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      "size-20 object-contain relative cursor-pointer rounded-lg",
                      "before:absolute before:inset-0 before: bg-secondary before:z-10",
                      index === mediaIndex ? "before:block" : "before:hidden"
                    )}
                    onClick={() => setMediaIndex(index)}
                  >
                    {commonImageExtensions.includes(
                      media?.name?.slice(media?.name?.lastIndexOf(".") + 1)
                    ) ? (
                      <img
                        className="object-contain w-full h-full"
                        src={convertFileToURL(media)}
                        alt="image"
                      />
                    ) : (
                      <FileSymlinkIcon
                        strokeWidth={1.5}
                        className="w-full h-full"
                      />
                    )}

                    {/* Remove file button */}
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-0 right-0 p-1 bg-black/50 text-white z-10"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}

                {/* Button to add more files */}
                <button
                  onClick={openFileDialog}
                  className="size-20 flex justify-center items-center rounded-lg border border-border-secondary"
                >
                  <PlusSquareIcon
                    strokeWidth={1}
                    className="size-14 fill-foreground/60 stroke-popover"
                  />
                </button>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleAddFile}
                />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </>
        )}

        {/* Message input and send button */}
        <div className="w-full bg-card rounded-full flex items-center justify-between px-3">
          <MessageContentFieltd
            handleSubmit={handleSubmit}
            handleError={handleError}
          />
          <button
            className="p-1 group"
            type="button"
            onClick={form.handleSubmit(handleSubmit, handleError)}
          >
            <SendHorizontalIcon
              strokeWidth={1}
              size={42}
              className="group-hover:scale-110 duration-200 stroke-card fill-primary"
            />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatImageInputDialog;
