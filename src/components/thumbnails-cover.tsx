import Image from "next/image";
import React from "react";

const ThumbnailsCover = ({ title }: { title?: string }) => {
  return (
    <div className="w-full h-fit flex flex-col items-center gap-2">
      <div className="w-full h-fit flex items-center justify-center">
        <Image
          src="/draftL.png"
          alt="draft"
          width={126}
          height={124}
          className="w-[126px] h-[124px] z-10 rounded-lg object-cover translate-x-14 -rotate-12"
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
          className="w-[126px] h-[124px] z-10 rounded-lg object-cover -translate-x-14 rotate-12"
        />
      </div>
      {title && <p className="font-semibold z-20">{title}</p>}
    </div>
  );
};

export default ThumbnailsCover;
