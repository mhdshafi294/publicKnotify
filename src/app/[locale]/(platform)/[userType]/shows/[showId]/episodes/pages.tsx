import React from "react";
import EpisodesPageContent from "./_components/episodes-page-content";

const EpisodesPage = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string; episodeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <EpisodesPageContent {...{ params, searchParams }} />;
};

export default EpisodesPage;
