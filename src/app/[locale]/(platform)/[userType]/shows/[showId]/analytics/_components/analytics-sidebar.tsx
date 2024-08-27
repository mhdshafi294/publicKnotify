import React from "react";
import { useTranslations } from "next-intl";

/**
 * The AnalyticsSidebar component renders the sidebar for the analytics page.
 *
 * It displays basic navigation options for analytics features such as overview and other metrics.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters containing user type and show ID.
 * @param {Object} props.searchParams - Query string parameters for filtering or additional actions.
 *
 * @returns {JSX.Element} The rendered AnalyticsSidebar component.
 */
const AnalyticsSidebar = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): JSX.Element => {
  const t = useTranslations("Index");

  return (
    <aside className="bg-card-secondary w-full lg:w-52 flex flex-col p-8 xl:pt-16 gap-5">
      <h2 className="text-lg font-light">{t("basic_analytics")}</h2>
      <h3 className="text-primary">{t("overview")}</h3>
    </aside>
  );
};

export default AnalyticsSidebar;
