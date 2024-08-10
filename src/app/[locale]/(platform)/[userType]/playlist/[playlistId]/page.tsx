import { useTranslations } from "next-intl"; // External dependency for translations
import { getServerSession } from "next-auth"; // External dependency for session management

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Internal authentication options
import { getPlayListAction } from "@/app/actions/podcastActions"; // Internal function for fetching playlist data

import PlaylistPodcast from "./_components/Playlist-podcast"; // Internal component for displaying playlist podcasts
import SideScrollPlaylistPodcasts from "./_components/side-scroll-playlist-podcasts"; // Internal component for side scrolling podcasts

/**
 * PlaylistPage Component
 *
 * This component renders a page displaying a playlist's podcasts. It includes a main section
 * for the playlist's podcasts and a side scroll component to show additional playlist details.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.params - Route parameters.
 * @param {string} props.params.userType - Type of the user.
 * @param {string} props.params.playlistId - The ID of the playlist to display.
 * @param {Object} props.searchParams - The query parameters from the URL.
 * @returns {JSX.Element} The rendered component with playlist details and podcast list.
 */
export default async function PlaylistPage({
  params,
  searchParams,
}: {
  params: { userType: string; playlistId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  const data = await getPlayListAction({
    type: session?.user?.type!,
    id: params.playlistId,
  });

  return (
    <div className="flex flex-col lg:flex-row relative pt-10 min-h-[calc(100vh-72px)]">
      <PlaylistPodcast
        params={params}
        searchParams={searchParams}
        podcasts={data?.playlist?.podcasts!}
      />
      <SideScrollPlaylistPodcasts
        podcasts={data?.playlist?.podcasts!}
        playlistName={data?.playlist?.name!}
      />
    </div>
  );
}
