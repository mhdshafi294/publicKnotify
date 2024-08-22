import React from "react";

const EpisodesPageContent = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string; episodeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <div>EpisodesPageContent</div>;
};

export default EpisodesPageContent;
