"use client";

import { getShowViewsStatisticsAction } from "@/app/actions/statisticsActions";
import { buttonVariants } from "@/components/ui/button";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { EnabledStatistics, ShowViewsStatistics } from "@/types/statistics";
import { useQuery } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";
import DashboardCardContainer from "../../_components/dashboard-card-container";
import AnalyticsEnableSwitch from "../analytics/_components/analytics-enable-switch";
import MostViewsChart from "./most-views-chart";

type ViewsChartCardProps = {
  title: string;
  value: string;
  showId: string;
  userType: string;
  link?: {
    href: string;
    name: string;
  };
  enabled: EnabledStatistics;
  showViewsForVisitors?: ShowViewsStatistics;
};

/**
 * The ViewsChartCard component displays a chart with associated metadata, including a title, value, and optional link.
 *
 * It is used to show key metrics like total views, along with a graphical representation of the data.
 *
 * @param {ViewsChartCardProps} props - The props for the component.
 * @param {string} props.title - The title of the card, usually representing the metric being displayed.
 * @param {string} [props.description] - An optional description for additional context.
 * @param {string} props.value - The primary value being highlighted on the card (e.g., number of views).
 * @param {Object} props.params - Route parameters, including user type and show ID.
 * @param {Object} [props.link] - Optional link details including the href and link name.
 * @param {React.ReactNode} props.chart - The chart component to render within the card.
 *
 * @returns {JSX.Element} The rendered ViewsChartCard component.
 */
const ViewsChartCard: React.FC<ViewsChartCardProps> = ({
  title,
  value,
  showId,
  userType,
  link,
  enabled,
  showViewsForVisitors,
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const {
    data: showViews,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["podcasterRequest", date],
    queryFn: () =>
      getShowViewsStatisticsAction({
        start_date: format(date?.from!, "yyyy-MM-dd"),
        end_date: format(date?.to!, "yyyy-MM-dd"),
        show_id: showId,
        type: userType,
      }),
    enabled: !!showId && userType === "podcaster",
  });

  return (
    <DashboardCardContainer className="flex-1 h-full flex flex-col gap-8">
      <div className="w-full flex justify-between gap-3">
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase opacity-70">{title}</h2>
          <p className="font-bold text-3xl">{value}</p>
        </div>
        <div className="flex flex-col gap-3 shrink">
          <div className="flex justify-end items-center gap-5">
            {title === "All-Time Views" || title === "مجموع المشاهدات" ? (
              <DatePickerWithRange
                date={date}
                setDate={setDate}
                className="w-fit"
              />
            ) : null}
            {userType === "podcaster" ? (
              <AnalyticsEnableSwitch
                className="ms-auto"
                enabled={enabled}
                statisticsType="top_episodes"
              />
            ) : null}
          </div>
          {link ? (
            <Link
              href={link.href}
              className={cn(
                buttonVariants({
                  variant: "default",
                  className: "font-bold rounded",
                })
              )}
            >
              {link.name}
            </Link>
          ) : null}
        </div>
      </div>
      {/* {chart} */}
      {showViewsForVisitors ? (
        <MostViewsChart showViews={showViewsForVisitors} date={date} />
      ) : isPending ? (
        <MostViewsChart
          showViews={{
            views_over_time: [
              {
                date: new Date().toISOString(),
                views_count: 0,
              },
            ],
          }}
          date={date}
        />
      ) : showViews ? (
        <MostViewsChart showViews={showViews} date={date} />
      ) : null}
    </DashboardCardContainer>
  );
};

export default ViewsChartCard;
