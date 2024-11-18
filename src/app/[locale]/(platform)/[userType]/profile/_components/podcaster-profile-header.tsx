import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

type PropsPodcasterProfileHeader = {
  image?: string;
  name?: string;
  monthlyListeners?: number;
};
const PodcasterProfileHeader: React.FC<PropsPodcasterProfileHeader> = async ({
  image,
  name,
  monthlyListeners,
}) => {
  const t = await getTranslations("Index");

  return (
    <div className={`w-full h-72 rounded-2xl overflow-hidden relative`}>
      <Image
        src={image ? image : "/podcaster-profile-cover.png"}
        alt="Placeholder"
        width={1100}
        height={1100}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 w-full h-full bg-black/30 flex flex-col gap-2 justify-center px-7 z-50">
        <h3 className="font-bold text-[32px]">{name ? name : ""}</h3>
        <p className="text-xl">40,142 {t("monthly-listeners")}</p>
      </div>
    </div>
  );
};

export default PodcasterProfileHeader;
