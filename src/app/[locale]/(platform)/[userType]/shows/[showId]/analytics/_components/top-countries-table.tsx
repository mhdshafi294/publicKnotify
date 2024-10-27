"use client";

import { getShowCountryStatisticsAction } from "@/app/actions/statisticsActions";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import React from "react";
import { DateRange } from "react-day-picker";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import { ShowCountryStatistics } from "@/types/statistics";

type TopCountriesTableProps = {
  showId: string;
  userType: string;
  visitorData?: ShowCountryStatistics;
};

/**
 * TopCountriesTable component displays a table with the top countries and their download counts.
 *
 * @param {TopCountriesTableProps} props - The props for the component.
 * @param {Array} props.top_countries - An array of objects representing each country and its count.
 * @param {number} props.total_count - The total count of downloads across all countries.
 *
 * @returns {JSX.Element} The rendered TopCountriesTable component.
 */
export default function TopCountriesTable({
  showId,
  userType,
  visitorData,
}: TopCountriesTableProps) {
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
        show_id: showId,
        type: userType,
      }),
    enabled: !!showId && userType === "podcaster" && !visitorData,
  });

  const tableData = visitorData ? visitorData : data;

  return (
    <DashboardCardContainer className="flex-1 h-fit flex flex-col gap-8">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase opacity-70">
            {t("all-times")}
          </h2>
          <p className="font-bold text-3xl">{t("top-countries")}</p>
        </div>
        {userType === "podcaster" ? (
          <div className="flex flex-col gap-3">
            <div className="flex justify-end items-center gap-5">
              <DatePickerWithRange
                date={isDateModified ? date : undefined}
                setDate={setDate}
                className="w-fit"
              />
            </div>
          </div>
        ) : null}
      </div>
      <Table className="flex-1 shrink-0 grow w-full text-lg">
        <TableHeader className="w-full">
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>{t("country")}</TableHead>
            <TableHead className="text-right">{t("downloads")}</TableHead>
            <TableHead className="text-right">%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {tableData?.top_countries.map((country, index) => (
            <TableRow
              key={country.country}
              className="relative"
              style={
                {
                  "--row-bg-width": `${
                    (country.count / tableData?.total_count) * 100
                  }%`,
                } as React.CSSProperties
              }
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{country.country}</TableCell>
              <TableCell className="text-right font-bold">
                {country.count}
              </TableCell>
              <TableCell className="text-right font-bold">
                {((country.count / tableData?.total_count) * 100).toFixed(0)}%
              </TableCell>
              <div
                className="absolute left-0 top-0 h-full bg-primary/20 z-0"
                style={{ width: "var(--row-bg-width)" }}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardCardContainer>
  );
}
