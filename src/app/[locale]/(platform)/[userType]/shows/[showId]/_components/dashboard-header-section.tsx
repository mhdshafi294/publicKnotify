import React from "react";
import DashboardMediumCard from "./dashboard-medium-card";

const DashboardHeaderSection = () => {
  return (
    <section className="w-full grid grid-rows-3 2xl:grid-rows-1 2xl:grid-cols-3 gap-8">
      <DashboardMediumCard
        imageSrc="/podcast-filler.webp"
        title="Publish an episode"
        description="In order to submit and publish your Show, you must first publish an episode"
        linkName="Add Podcast"
        linkHref="/podcaster/shows/1/publish"
        done={true}
      />
      <DashboardMediumCard
        imageSrc="/podcaster-filler.webp"
        title="Publish an episode"
        description="In order to submit and publish your Show, you must first publish an episode"
        linkName="Show Episodes"
        linkHref="/podcaster/shows/1/episodes"
        done={false}
      />
      <DashboardMediumCard
        imageSrc="/podcast-filler.webp"
        title="Publish an episode"
        description="In order to submit and publish your Show, you must first publish an episode"
        linkName="Add Podcast"
        linkHref="/podcaster/shows/1/publish"
        done={false}
      />
    </section>
  );
};

export default DashboardHeaderSection;
