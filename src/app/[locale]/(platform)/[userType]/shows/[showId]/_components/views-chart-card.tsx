import React from "react";
import DashboardCardContainer from "../../_components/dashboard-card-container";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import MostViewsChart from "./most-views-chart";

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
};

const ViewsChartCard: React.FC<ViewsChartCardProps> = ({
  title,
  description,
  value,
  params,
  link,
  chart,
}) => {
  return (
    <DashboardCardContainer className="flex-1 h-full flex flex-col gap-8">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase opacity-70">{title}</h2>
          <p className="font-bold text-3xl">{value}</p>
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
      {chart}
    </DashboardCardContainer>
  );
};

export default ViewsChartCard;
