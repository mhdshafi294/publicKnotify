import React from "react";
import PodcasterDashboard from "./_components/podcaster-dashboard";

type PageProps = {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

/**
 * The Page component serves as the main entry point for the podcaster's dashboard page.
 * It passes the route parameters and search parameters to the PodcasterDashboard component.
 *
 * @param {PageProps} props - The props for the component.
 * @param {Object} props.params - Route parameters, including user type and show ID.
 * @param {Object} props.searchParams - Query parameters passed in the URL.
 *
 * @returns {JSX.Element} The rendered Page component.
 */
const Page: React.FC<PageProps> = ({ params, searchParams }) => {
  return (
    <div className="flex flex-1 flex-col items-start justify-start gap-6 w-full">
      <PodcasterDashboard {...{ params, searchParams }} />
    </div>
  );
};

export default Page;
