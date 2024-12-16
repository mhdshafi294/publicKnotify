import { cn, getDirection } from "@/lib/utils";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

const ThumbnailsCover = ({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) => {
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <div
      className={cn("w-full h-fit flex flex-col items-center gap-2", className)}
    >
      <div className="w-full h-fit flex items-center justify-center">
        <Image
          src="/draftL.png"
          priority
          alt="draft"
          width={126}
          height={124}
          className={cn(
            "w-auto h-auto z-10 rounded-lg object-cover translate-x-14 ",
            { "translate-x-14 -rotate-12": dir === "ltr" },
            { "-translate-x-14 rotate-12": dir === "rtl" }
          )}
        />
        <Image
          src="/draftC.png"
          alt="draft"
          width={150}
          height={148}
          className="w-[150px] h-[148px] z-20 rounded-lg object-cover"
        />
        <Image
          src="/draftR.png"
          alt="draft"
          width={126}
          height={124}
          className={cn(
            "w-auto h-auto z-10 rounded-lg object-cover ",
            { "-translate-x-14 rotate-12": dir === "ltr" },
            { "translate-x-14 -rotate-12": dir === "rtl" }
          )}
        />
      </div>
      {title && <p className="font-semibold z-20">{title}</p>}
    </div>
  );
};

export default ThumbnailsCover;
