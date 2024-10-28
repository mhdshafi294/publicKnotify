import { useTranslations } from "next-intl";
import ShowSelector from "./show-selector";

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
const VisitorsAnalyticsSidebar = ({
  podcaster_id,
  show_id,
}: {
  podcaster_id: string;
  show_id?: string;
}): JSX.Element => {
  const t = useTranslations("Index");

  return (
    <aside className="bg-card-secondary w-full lg:w-52 flex flex-col p-8 xl:px-3 xl:pt-16 gap-5">
      <h2 className="text-lg font-light">{t("basic_analytics")}</h2>
      <h3 className="text-primary">{t("overview")}</h3>
      <div className="space-y-1">
        <h4 className="text-muted-foreground text-sm font-semibold">
          {t("selected-show")}
        </h4>
        {show_id ? (
          <ShowSelector podcaster_id={podcaster_id} show_id={show_id} />
        ) : (
          <h5 className="text-muted-foreground text-sm font-semibold italic">
            {t("no-show-created-by-this-podcaster-yet")}
          </h5>
        )}
      </div>
    </aside>
  );
};

export default VisitorsAnalyticsSidebar;
