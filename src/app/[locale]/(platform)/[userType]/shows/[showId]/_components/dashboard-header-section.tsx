import React from "react";
import DashboardMediumCard from "./dashboard-medium-card";

const DashboardHeaderSection = ({
  params,
}: {
  params: { userType: string; showId: string };
}) => {
  return (
    <section className="w-full grid grid-rows-3 2xl:grid-rows-1 2xl:grid-cols-3 gap-8">
      <DashboardMediumCard
        imageSrc="/podcast-filler.webp"
        title="Publish an episode"
        description="In order to submit and publish your Show, you must first publish an episode"
        linkName="Add Podcast"
        linkHref={`/podcaster/shows/${params.showId}/publish`}
        done={true}
      />
      <DashboardMediumCard
        imageSrc="/podcaster-filler.webp"
        title="Publish an episode"
        description="In order to submit and publish your Show, you must first publish an episode"
        linkName="Show Episodes"
        linkHref={`/podcaster/shows/${params.showId}/episodes`}
        done={false}
      />
      <DashboardMediumCard
        imageSrc="/podcast-filler.webp"
        title="Submit your show"
        description="To allow listeners to enjoy your show, submit your feed to Apple Podcasts, Spotify, and more"
        linkName="Show Distribution"
        linkHref={`/podcaster/shows/${params.showId}/distrebution`}
        done={false}
      />
    </section>
  );
};

export default DashboardHeaderSection;
