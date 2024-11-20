"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileSymlinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import SimplifiedCreateRequestForm from "./simplified-create-request-form";

const CreateRequestDialog = ({ podcasterID }: { podcasterID: string }) => {
  const t = useTranslations("Index");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-7 font-bold px-10 flex justify-center items-center gap-2 rounded-full">
          <FileSymlinkIcon size={15} strokeWidth={3} />
          <span>{t("sendRequest")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-card-secondary max-w-3xl sm:rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Request for Podcaster
          </DialogTitle>
        </DialogHeader>
        <SimplifiedCreateRequestForm podcasterID={podcasterID} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateRequestDialog;
