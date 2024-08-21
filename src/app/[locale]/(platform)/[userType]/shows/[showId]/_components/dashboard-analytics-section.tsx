import React from "react";
import DashboardCardContainer from "../../_components/dashboard-card-container";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import MostViewsChart from "./most-views-chart";
import { Separator } from "@/components/ui/separator";
import ViewsChartCard from "./views-chart-card";

const DashboardAnalyticsSection = ({
  params,
}: {
  params: { userType: string; showId: string };
}) => {
  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:h-[358px] 2xl:h-[583px]">
      <ViewsChartCard
        title="Views last 7 days"
        value="2746"
        params={params}
        link={{ name: "View Analytics", href: `${params.showId}/analytics` }}
        chart={<MostViewsChart />}
      />
      <DashboardCardContainer className="lg:w-56 lg:h-full flex lg:flex-col gap-3">
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-50">All-Time Views</h2>
          <p className="font-bold text-xl">500</p>
        </div>
        <Separator className="w-full bg-border-secondary" />
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-50">Top Country</h2>
          <p className="font-bold text-xl capitalize">netherlands</p>
        </div>
        <Separator className="w-full bg-border-secondary" />
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-50">Most Popular Time </h2>
          <p className="font-bold text-xl">11am - 12pm</p>
        </div>
        <Separator className="w-full bg-border-secondary" />
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-sm font-bold opacity-50">Most Popular Day</h2>
          <p className="font-bold text-xl">Sunday</p>
        </div>
      </DashboardCardContainer>
    </section>
  );
};

export default DashboardAnalyticsSection;
