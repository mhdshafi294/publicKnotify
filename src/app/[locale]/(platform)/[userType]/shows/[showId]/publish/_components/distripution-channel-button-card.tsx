"use client";

import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
} from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DistriputionChannelButtonCardProps = {
  platfotmName: string;
  PlatfotmIcon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
  >;
  selectedPlatforms: string[];
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
};

/**
 * DistributionChannelButtonCard component that allows users to select platforms for distribution.
 *
 * @param {DistriputionChannelButtonCardProps} props - The properties passed to the component.
 * @returns {JSX.Element} The distribution channel button card component.
 *
 * @example
 * ```tsx
 * <DistriputionChannelButtonCard
 *   platfotmName="youtube"
 *   PlatfotmIcon={YoutubeIcon}
 *   selectedPlatforms={selectedPlatforms}
 *   setSelectedPlatforms={setSelectedPlatforms}
 * />
 * ```
 */
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

  // Handle button click to toggle platform selection
  const handlePlatformSelection = () => {
    if (platfotmName === "web") {
      return; // "web" platform should always be selected
    }
    setSelectedPlatforms((prev) =>
      prev.includes(platfotmName)
        ? prev.filter((p) => p !== platfotmName)
        : [...prev, platfotmName]
    );
  };

  return (
    <Button
      variant="secondary"
      type="button"
      className={cn(
        "rounded-md bg-black border h-14 w-60 flex justify-start gap-5 items-center p-2 cursor-pointer",
        {
          "opacity-70 dark:opacity-50":
            !selectedPlatforms.includes(platfotmName),
        }
      )}
      onClick={handlePlatformSelection}
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
