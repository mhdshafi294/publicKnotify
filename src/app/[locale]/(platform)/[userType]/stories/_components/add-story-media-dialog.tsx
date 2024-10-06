"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImagesIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

const AddStoryMediaDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) => {
  const t = useTranslations("Index");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger className="w-full flex"></DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-3">
            <span>{t("photos-and-videos")}</span>
            <ImagesIcon className="h-4 w-4" />
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddStoryMediaDialog;
