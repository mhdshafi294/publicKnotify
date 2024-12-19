"use client";

import { postEnableStatisticsAction } from "@/app/actions/statisticsActions";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import useEnableStatsStore from "@/store/use-stats-enable-store";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "sonner";

type AnalyticsEnableSwitchProps = {
  statisticsType:
    | "playlist_statistics"
    | "top_episodes"
    | "youtube_channel"
    | "most_popular"
    | "time"
    | "platform"
    | "country";
  className?: string;
};

const AnalyticsEnableSwitch: React.FC<AnalyticsEnableSwitchProps> = ({
  statisticsType,
  className,
}) => {
  const t = useTranslations("Index");
  const { data: session } = useSession();

  const enabled = useEnableStatsStore((state) => state.enabled);
  const toggleSpecificEnabled = useEnableStatsStore(
    (state) => state.toggleSpecificEnabled
  );

  const { mutate: server_postEnableStatisticsAction, isPending } = useMutation({
    mutationFn: postEnableStatisticsAction,
    onSuccess: () => {
      toggleSpecificEnabled(statisticsType);
      toast.success(t("updatedSuccessfully"));
    },
    onError: () => {
      toast.error(t("errorTryAgain"));
    },
  });

  const handleAnalyticsEnable = () => {
    if (enabled) {
      server_postEnableStatisticsAction({
        type: "podcaster",
        body: {
          playlist_statistics: +enabled["playlist_statistics"],
          top_episodes: +enabled["top_episodes"],
          youtube_channel: +enabled["youtube_channel"],
          most_popular: +enabled["most_popular"],
          time: +enabled["time"],
          platform: +enabled["platform"],
          country: +enabled["country"],
          [statisticsType]: enabled[statisticsType] ? 0 : 1,
        },
      });
    }
  };

  if (
    session?.user?.type !== "podcaster" ||
    enabled?.podcaster_id !== session?.user?.id
  ) {
    return null;
  }

  if (!enabled) return null;

  return (
    <HoverCard>
      <HoverCardTrigger
        className={cn("flex items-center space-x-2", className)}
      >
        <div>
          <Switch
            id="airplane-mode"
            checked={enabled[statisticsType]}
            onCheckedChange={handleAnalyticsEnable}
            disabled={isPending}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="border-border-secondary bg-card-secondary/90 rounded-2xl">
        {enabled[statisticsType]
          ? t("disable-this-analytics-to-be-seen-by-companies")
          : t("enable-this-analytics-to-be-seen-by-companies")}
      </HoverCardContent>
    </HoverCard>
  );
};

export default AnalyticsEnableSwitch;
