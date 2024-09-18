import React from "react";
import DashboardCardContainer from "../../_components/dashboard-card-container";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import AnalyticsEnableSwitch from "../analytics/_components/analytics-enable-switch";
import { EnabledStatistics } from "@/types/statistics";

type ViewsChartCardProps = {
  title: string;
  description?: string;
  value: string;
  params: { userType: string; showId: string };
  link?: {
    href: string;
    name: string;
  };
  chart: React.ReactNode;
  enabled: EnabledStatistics;
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
  description,
  value,
  params,
  link,
  chart,
  enabled,
}) => {
  return (
    <DashboardCardContainer className="flex-1 h-full flex flex-col gap-8">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase opacity-70">{title}</h2>
          <p className="font-bold text-3xl">{value}</p>
        </div>
        <div className="flex flex-col gap-3">
          <AnalyticsEnableSwitch
            className="ms-auto self-end"
            enabled={enabled}
            statiscsType="top_episodes"
          />
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
      {chart}
    </DashboardCardContainer>
  );
};

export default ViewsChartCard;
