import { getPlayListsByPodcasterAction } from "@/app/actions/podcastActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";
import VisitorsAnalyticsMainContent from "./_components/visitors-analytics-main-content";
import VisitorsAnalyticsSidebar from "./_components/visitors-analytics-sidebar";

/**
 * ShowsStatsPage Component
 *
 * This page could be shown only by companies. It fetches and displays analysis for a specified show. It retrieves
 * session information to verify the user's type and ensure access rights. If the user is
 * not of type 'company', they are redirected based on their user type. The component uses
 * query parameters to determine the podcaster and show IDs for fetching data. The fetched
 * playlists are then rendered in a list format.
 *
 * @param {Object} params - Contains user type information.
 * @param {string} params.userType - The type of the user (e.g., company).
 * @param {Object} searchParams - Query parameters for filtering data.
 * @param {string} [searchParams.podcaster_id] - The ID of the podcaster to fetch playlists for.
 * @param {string} [searchParams.show_id] - The ID of the show.
 * @returns {JSX.Element} The rendered component displaying playlists associated with the podcaster.
 */
const ShowsStatsPage = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);

  if (!session || session.expires || session.user.type !== "company") {
    redirect(`/${session?.user?.type}`);
  }

  const podcaster_id =
    typeof searchParams.podcaster_id === "string"
      ? searchParams.podcaster_id
      : "1";
  const show_id =
    typeof searchParams.show_id === "string" ? searchParams.show_id : undefined;

  if (!show_id) {
    const initial_podcaster_playlist_response =
      await getPlayListsByPodcasterAction({
        podcasterId: podcaster_id as string,
        type: session?.user?.type!,
      });
    if (
      initial_podcaster_playlist_response &&
      initial_podcaster_playlist_response?.playlists?.length > 0
    ) {
      redirect(
        `/${session?.user?.type}/shows_stats?podcaster_id=${podcaster_id}&show_id=${initial_podcaster_playlist_response?.playlists[0].id}`
      );
    } else {
      redirect(`/${session?.user?.type}/profile/podcaster/${podcaster_id}`);
    }
  }

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
