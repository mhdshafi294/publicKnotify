/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { commonImageExtensions } from "@/constant";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import MessageContentFieltd from "./message-content-fieltd";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useImageOnLoad } from "@/hooks/use-image-on-load";
import { cn, convertFileToURL } from "@/lib/utils";
import {
  FileSymlinkIcon,
  PlusSquareIcon,
  SendHorizontalIcon,
  Trash2Icon,
  X,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

  // Function to handle the file selection and add it to the "media" field
  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const currentMedia = form.getValues("media") || [];
      form.setValue("media", [...currentMedia, ...Array.from(files)], {
        shouldValidate: true,
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    // Get the current media array using getValues to ensure it's up-to-date
    // const currentMedia = form.getValues("media") || [];

    // Remove the file at the specified index
    const updatedMedia = mediaArray.filter((_: any, i: number) => i !== index);

    let newMediaIndex = mediaIndex;

    if (updatedMedia.length === 0) {
      // If no media is left, reset mediaIndex to 0
      newMediaIndex = 0;
    } else if (index === 0) {
      // If removing the first item, keep mediaIndex at 0 (new first item)
      newMediaIndex = 0;
    } else if (index >= updatedMedia.length) {
      // If removing the last item, set index to the new last item
      newMediaIndex = updatedMedia.length - 1;
    } else if (index <= mediaIndex) {
      // If the removed item is at or before the current mediaIndex, decrement mediaIndex
      newMediaIndex = mediaIndex - 1;
    }

    // Ensure mediaIndex is valid and not negative
    setMediaIndex(Math.max(newMediaIndex, 0));

    // Update the form with the new media array
    form.setValue("media", updatedMedia, { shouldValidate: true });
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
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
                    mediaArray.length > 0 ? "images" : "image"
                  } selected`
                : `${mediaArray.length} ${
                    mediaArray.length > 0 ? "files" : "file"
                  } selected`}
            </DialogTitle>
          ) : null}
        </DialogHeader>
        {mediaArray.length > 0 ? (
          <>
            {/* <PhotoProvider maskOpacity={0.5}> */}
            {mediaArray[mediaIndex]?.name ? (
              <>
                {commonImageExtensions.includes(
                  mediaArray[mediaIndex]?.name?.slice(
                    mediaArray[mediaIndex]?.name?.lastIndexOf(".") + 1
                  )
                ) ? (
                  <img
                    className={cn(
                      "object-contain relative cursor-pointer w-full max-h-[500px] rounded-lg",
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
            ) : mediaArray[0]?.name ? (
              <>
                {commonImageExtensions.includes(
                  mediaArray[0]?.name?.slice(
                    mediaArray[0]?.name?.lastIndexOf(".") + 1
                  )
                ) ? (
                  <img
                    className={cn(
                      "object-contain relative cursor-pointer w-full max-h-[500px] rounded-lg",
                      "before:absolute before:inset-0 before: bg-secondary before:z-10",
                      isLoaded ? "before:hidden" : "before:block"
                    )}
                    src={convertFileToURL(mediaArray[0])}
                    alt="image"
                  />
                ) : (
                  <FileSymlinkIcon strokeWidth={1} className="w-full h-full " />
                )}
              </>
            ) : null}
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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
                        className="w-full h-full "
                      />
                    )}
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-0 right-0 p-1 bg-black/50 text-white z-10"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {/* File input button */}
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
            {/* </PhotoProvider> */}
          </>
        ) : null}
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
