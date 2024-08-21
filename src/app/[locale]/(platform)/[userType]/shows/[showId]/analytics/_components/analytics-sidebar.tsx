import React from "react";

const AnalyticsSidebar = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <aside className="bg-card-secondary w-full lg:w-52 flex flex-col p-8 xl:pt-16 gap-5">
      <h2 className="text-lg font-light">Basic Analytics</h2>
      <h3 className="text-primary ">Overview</h3>
    </aside>
  );
};

export default AnalyticsSidebar;
