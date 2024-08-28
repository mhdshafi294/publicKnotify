import React from "react";
import AnalyticsSidebar from "./_components/analytics-sidebar";
import AnalyticsMainContent from "./_components/analytics-main-content";

/**
 * The ShowAnalyticsPage component is responsible for rendering the analytics page for a specific show.
 *
 * It displays the sidebar for analytics options and the main content area with detailed analytics data.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters containing user type and show ID.
 * @param {Object} props.searchParams - Query string parameters for filtering or additional actions.
 *
 * @returns {JSX.Element} The rendered ShowAnalyticsPage component.
 */
const ShowAnalyticsPage = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): JSX.Element => {
  return (
    <div className="flex flex-1 flex-col items-start justify-start gap-6 w-full">
      <div className="flex-1 h-full flex flex-col lg:flex-row w-full">
        <AnalyticsSidebar params={params} searchParams={searchParams} />
        <AnalyticsMainContent params={params} searchParams={searchParams} />
      </div>
    </div>
  );
};

export default ShowAnalyticsPage;
