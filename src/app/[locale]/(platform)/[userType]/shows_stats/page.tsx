// External imports
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";

// Local imports
import { getPlayListsByPodcasterAction } from "@/app/actions/podcastActions";
import VisitorsAnalyticsMainContent from "./_components/visitors-analytics-main-content";
import VisitorsAnalyticsSidebar from "./_components/visitors-analytics-sidebar";

/**
 * ShowsStatsPage Component
 *
 * This component renders the statistics page for a company's show.
 * It verifies the session and user type to restrict access to companies only.
 * If the user is not a company, they are redirected to their respective page.
 * The component uses query parameters to fetch playlists for a specified show by the podcaster.
 *
 * @param {Object} params - Contains parameters for user type verification.
 * @param {string} params.userType - The type of the user, expected to be 'company'.
 * @param {Object} searchParams - Query parameters for data retrieval.
 * @param {string} [searchParams.podcaster_id] - ID of the podcaster whose playlists are to be fetched.
 * @param {string} [searchParams.show_id] - ID of the specific show.
 * @returns {JSX.Element} The rendered component displaying podcaster playlists and analytics.
 *
 * @example
 * // Example usage of ShowsStatsPage component
 * <ShowsStatsPage params={{ userType: 'company' }} searchParams={{ podcaster_id: '123', show_id: '456' }} />
 */
const ShowsStatsPage = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Fetch session information to ensure access permissions
  const session = await getServerSession(authOptions);

  // Redirect if the session is invalid or the user is not a 'company'
  if (!session || session.expires || session.user.type !== "company") {
    redirect(`/${session?.user?.type}`);
  }

  // Extract podcaster and show IDs from query parameters
  const podcaster_id =
    typeof searchParams.podcaster_id === "string"
      ? searchParams.podcaster_id
      : "1";
  const show_id =
    typeof searchParams.show_id === "string" ? searchParams.show_id : undefined;

  // If no show ID is provided, fetch the initial playlist and redirect to the first show
  if (!show_id) {
    const initial_podcaster_playlist_response =
      await getPlayListsByPodcasterAction({
        podcasterId: podcaster_id as string,
        type: session?.user?.type!,
      });

    if (
      initial_podcaster_playlist_response &&
      initial_podcaster_playlist_response.playlists?.length > 0
    ) {
      redirect(
        `/${session?.user?.type}/shows_stats?podcaster_id=${podcaster_id}&show_id=${initial_podcaster_playlist_response.playlists[0]?.id}`
      );
    }
  }

  // Render the component with sidebar and main content
  return (
    <div className="flex flex-1 flex-col items-start justify-start gap-6 w-full">
      <div className="flex-1 h-full flex flex-col lg:flex-row w-full">
        <VisitorsAnalyticsSidebar
          podcaster_id={podcaster_id}
          show_id={show_id!}
        />
        <VisitorsAnalyticsMainContent
          podcasterId={podcaster_id}
          showId={show_id!}
          userType={params.userType}
        />
      </div>
    </div>
  );
};

export default ShowsStatsPage;
