import React from "react";
import EpisodesPageContent from "./_components/episodes-page-content";

/**
 * The EpisodesPage component is responsible for rendering the main episodes page.
 *
 * It passes the route parameters and query string parameters to the EpisodesPageContent component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters containing user and show information.
 * @param {Object} props.searchParams - Query string parameters for filtering or additional actions.
 *
 * @returns {JSX.Element} The rendered EpisodesPage component.
 */
const EpisodesPage = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string; episodeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): JSX.Element => {
  return <EpisodesPageContent {...{ params, searchParams }} />;
};

export default EpisodesPage;
