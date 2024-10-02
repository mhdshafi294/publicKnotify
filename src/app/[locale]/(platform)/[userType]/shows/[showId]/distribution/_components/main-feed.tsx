"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import React, { use, useRef } from "react";
import { toast } from "sonner";

type MainFeedProps = {
  rssUrl: string;
};
const MainFeed: React.FC<MainFeedProps> = ({ rssUrl }) => {
  const t = useTranslations("Index");

  const textRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log(t("text-copied-to-clipboard"));
          toast.success(t("text-copied-to-clipboard"));
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          toast.error(t("failed-to-copy-text"));
        });
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 rounded border border-border-secondary p-5">
      <div className="w-full flex justify-between items-center ">
        <h2 className="text-lg font-bold capitalize">{t("main-feed")}</h2>
        <div className="flex justify-end items-center gap-2">
          <div className="size-1.5 bg-green-500 rounded-full" />
          <p className="text-sm font-light">{t("public")}</p>
        </div>
      </div>
      <Separator className="bg-border-secondary" />
      <div className="w-full flex justify-between items-center gap-2 py-2">
        <div
          ref={textRef}
          className="text-sm px-2 py-[10px] bg-card-secondary flex-1 rounded-sm  text-ellipsis overflow-hidden tracking-widest"
        >
          {rssUrl}
        </div>
        <Button variant="outline" className="rounded-sm" onClick={handleCopy}>
          {t("copy")}
        </Button>
      </div>
    </div>
  );
};

export default MainFeed;
