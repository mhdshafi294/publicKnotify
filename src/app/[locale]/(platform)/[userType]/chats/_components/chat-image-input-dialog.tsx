"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { commonImageExtensions } from "@/constant";
import { PaperclipIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import MessageContentFieltd from "./message-content-fieltd";

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

  const form = useFormContext();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {/* <DialogTrigger className="group p-2">
        <PaperclipIcon className="opacity-50 group-hover:opacity-100 duration-200" />
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          {form.getValues("media").length > 0 ? (
            <DialogTitle>
              {commonImageExtensions.includes(
                form
                  .getValues("media")
                  [mediaIndex].slice(
                    form.getValues("media")[mediaIndex].lastIndexOf(".") + 1
                  )
              )
                ? `${form.getValues("media").length} ${
                    form.getValues("media").length > 0 ? "images" : "image"
                  } selected`
                : `${form.getValues("media").length} ${
                    form.getValues("media").length > 0 ? "files" : "file"
                  } selected`}
            </DialogTitle>
          ) : null}
        </DialogHeader>
        <MessageContentFieltd
          handleSubmit={handleSubmit}
          handleError={handleError}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChatImageInputDialog;
