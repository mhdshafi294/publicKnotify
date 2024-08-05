"use client";

import YoutubeIcon from "@/components/icons/youtube-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
} from "react";
import { useTranslations } from "next-intl";

type DistriputionChannelButtonCardProps = {
  platfotmName: string;
  PlatfotmIcon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
  >;
  selectedPlatforms: string[];
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
};

const DistriputionChannelButtonCard: React.FC<
  DistriputionChannelButtonCardProps
> = ({
  platfotmName,
  PlatfotmIcon,
  selectedPlatforms,
  setSelectedPlatforms,
}) => {
  const t = useTranslations("Index");
  const { data: session } = useSession();

  return (
    <Button
      variant="secondary"
      type="button"
      className={cn(
        "rounded-md bg-black border h-14 w-60 flex justify-start gap-5 items-center p-2 cursor-pointer",
        {
          "opacity-50": !selectedPlatforms.includes(platfotmName),
        }
      )}
      onClick={() => {
        if (platfotmName === "web") {
          return;
        }
        setSelectedPlatforms((prev) => {
          if (prev.includes(platfotmName)) {
            return prev.filter((p) => p !== platfotmName);
          } else {
            return [...prev, platfotmName];
          }
        });
      }}
    >
      <PlatfotmIcon />
      <div className="flex flex-col items-start">
        <p className="text-sm">{t("listenOn")}</p>
        <p className="">{t(`platform.${platfotmName}`)}</p>
      </div>
    </Button>
  );
};

export default DistriputionChannelButtonCard;
