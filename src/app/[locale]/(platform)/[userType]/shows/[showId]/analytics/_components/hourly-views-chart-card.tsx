"use client";

import { getShowTimeStatisticsAction } from "@/app/actions/statisticsActions";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { useQuery } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import { useTranslations } from "next-intl";
import React from "react";
import { DateRange } from "react-day-picker";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import HourlyViewsChart from "./hourly-views-chart";

type HourlyViewsChartCardProps = {
  params: { userType: string; showId: string };
};

const HourlyViewsChartCard: React.FC<HourlyViewsChartCardProps> = ({
  params,
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(0),
    to: new Date(),
  });

  const date0 = new Date(0);
  const isDateModified = date?.from?.toString() !== date0.toString();

  const t = useTranslations("Index");

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["showTimeStatistics", date],
    queryFn: () =>
      getShowTimeStatisticsAction({
        start_date: !isDateModified
          ? undefined
          : format(date?.from!, "yyyy-MM-dd"),
        end_date: !isDateModified ? undefined : format(date?.to!, "yyyy-MM-dd"),
        show_id: params.showId,
        type: params.userType,
      }),
    enabled: !!params.showId && !!params.userType,
  });

  return (
    <DashboardCardContainer className="flex-1 h-full flex flex-col justify-between gap-8">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase opacity-70">
            {t("hourly-views")}
          </h2>
          <p className="font-bold text-3xl">{t("time-of-day")}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-end items-center gap-5">
            <DatePickerWithRange
              date={isDateModified ? date : undefined}
              setDate={setDate}
              className="w-fit"
            />
          </div>
        </div>
      </div>
      {/* {chart} */}
      {isPending ? (
        <HourlyViewsChart
          data={[
            {
              hour: 23,
              count: 0,
            },
          ]}
        />
      ) : data ? (
        <HourlyViewsChart data={data.times} />
      ) : null}
    </DashboardCardContainer>
  );
};

export default HourlyViewsChartCard;
