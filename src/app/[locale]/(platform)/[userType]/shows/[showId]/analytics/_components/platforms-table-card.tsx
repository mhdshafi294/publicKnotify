"use client";

import { getShowPlatformStatisticsAction } from "@/app/actions/statisticsActions";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { EnabledStatistics } from "@/types/statistics";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import React from "react";
import { DateRange } from "react-day-picker";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import AnalyticsEnableSwitch from "./analytics-enable-switch";
import MostPlatformTable from "./most-platform-table";

type PlatformsTableCardProps = {
  showId: string;
  userType: string;
  enabled: EnabledStatistics;
};

const PlatformsTableCard: React.FC<PlatformsTableCardProps> = ({
  showId,
  userType,
  enabled,
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(0),
    to: new Date(),
  });

  const date0 = new Date(0);
  const isDateModified = date?.from?.toString() !== date0.toString();

  const t = useTranslations("Index");

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["showPlatformStatistics", date],
    queryFn: () =>
      getShowPlatformStatisticsAction({
        start_date: !isDateModified
          ? undefined
          : format(date?.from!, "yyyy-MM-dd"),
        end_date: !isDateModified ? undefined : format(date?.to!, "yyyy-MM-dd"),
        show_id: showId,
        type: userType,
      }),
    enabled: !!showId && !!userType,
  });

  return (
    <DashboardCardContainer className="flex-1 h-full flex flex-col gap-8">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase opacity-70">
            {t("applications")}
          </h2>
          <p className="font-bold text-3xl">{t("top-listening-methods")}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-end items-center gap-5">
            <DatePickerWithRange
              date={isDateModified ? date : undefined}
              setDate={setDate}
              className="w-fit"
            />
            {userType === "podcaster" ? (
              <AnalyticsEnableSwitch
                className="ms-auto"
                enabled={enabled}
                statisticsType="platform"
              />
            ) : null}
          </div>
        </div>
      </div>
      {/* {chart} */}
      {isPending ? (
        <MostPlatformTable
          platformsDownloads={[
            {
              platform: "",
              count: 0,
            },
          ]}
          totalCount={0}
        />
      ) : data ? (
        <MostPlatformTable
          platformsDownloads={data?.top_platforms!}
          totalCount={data?.total_count!}
        />
      ) : null}
    </DashboardCardContainer>
  );
};

export default PlatformsTableCard;
