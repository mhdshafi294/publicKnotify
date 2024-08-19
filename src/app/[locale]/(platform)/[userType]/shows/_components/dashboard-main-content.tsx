import React from "react";
import DashboardMediumCard from "./dashboard-medium-card";
import DashboardCardContainer from "./dashboard-card-container";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MostViewsChart from "./most-views-chart";

const DashboardMainContent = () => {
  return (
    <div className="bg-background w-full flex-1 py-16 px-8 xl:px-16 flex flex-col gap-8">
      <div className="w-full grid grid-rows-3 2xl:grid-rows-1 2xl:grid-cols-3 gap-8">
        <DashboardMediumCard
          imageSrc="/podcast-filler.webp"
          title="Publish an episode"
          description="In order to submit and publish your Show, you must first publish an episode"
          linkName="add episode"
          linkHref="/podcaster/publish"
          done={true}
        />
        <DashboardMediumCard
          imageSrc="/podcaster-filler.webp"
          title="Publish an episode"
          description="In order to submit and publish your Show, you must first publish an episode"
          linkName="add episode"
          linkHref="/podcaster/publish"
          done={true}
        />
        <DashboardMediumCard
          imageSrc="/podcast-filler.webp"
          title="Publish an episode"
          description="In order to submit and publish your Show, you must first publish an episode"
          linkName="add episode"
          linkHref="/podcaster/publish"
          done={false}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-8 lg:h-[358px] 2xl:h-[583px]">
        <DashboardCardContainer className="flex-1 lg:h-full flex flex-col gap-5">
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-bold uppercase opacity-70">
                Views last 7 days
              </h2>
              <p className="font-bold text-3xl">500</p>
            </div>
            <Link
              href={`/podcaster/statistics`}
              className={cn(
                buttonVariants({
                  variant: "default",
                  className: "font-bold rounded",
                })
              )}
            >
              View Analitics
            </Link>
          </div>

          <MostViewsChart />
        </DashboardCardContainer>
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
      </div>
    </div>
  );
};

export default DashboardMainContent;
