import React from "react";
import EpisodePageContent from "./_components/episode_page_content";

/**
 * The EpisodeDetailsPage component is responsible for rendering the detailed view of a specific episode.
 *
 * It passes the route parameters and query string parameters to the EpisodePageContent component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters containing user, show, and episode information.
 * @param {Object} props.searchParams - Query string parameters for filtering or additional actions.
 *
 * @returns {JSX.Element} The rendered EpisodeDetailsPage component.
 */
const EpisodeDetailsPage = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string; episodeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): JSX.Element => {
  return <EpisodePageContent {...{ params, searchParams }} />;
};

export default EpisodeDetailsPage;
