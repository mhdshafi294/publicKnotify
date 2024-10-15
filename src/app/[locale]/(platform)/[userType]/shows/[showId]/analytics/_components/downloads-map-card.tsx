"use client";

import { getShowCountryStatisticsAction } from "@/app/actions/statisticsActions";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import React from "react";
import { DateRange } from "react-day-picker";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import DownloadsMap from "./downloads-map";

type DownloadsMapCardProps = {
  params: { userType: string; showId: string };
};

/**
 * Functional component that displays a map card for downloads based on the provided props.
 * @param {DownloadsMapCardProps} params - The props containing necessary data for the component.
 * @returns {JSX.Element} A map card component displaying download information.
 */
const DownloadsMapCard: React.FC<DownloadsMapCardProps> = ({ params }) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(0),
    to: new Date(),
  });

  const date0 = new Date(0);
  const isDateModified = date?.from?.toString() !== date0.toString();

  const t = useTranslations("Index");

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["showCountryStatistics", date],
    queryFn: () =>
      getShowCountryStatisticsAction({
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
            {t("world-map")}
          </h2>
          <p className="font-bold text-3xl">{t("downloads-by-country")}</p>
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
      {/* {map} */}
      {isPending ? (
        <DownloadsMap
          downloads={[
            {
              country: "United States",
              count: 0,
            },
          ]}
        />
      ) : data ? (
        <DownloadsMap downloads={data.downloads_by_location} />
      ) : null}
    </DashboardCardContainer>
  );
};

export default DownloadsMapCard;
