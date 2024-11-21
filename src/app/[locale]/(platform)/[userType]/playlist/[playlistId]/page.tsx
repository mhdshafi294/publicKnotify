import { useTranslations } from "next-intl"; // External dependency for translations
import { getServerSession } from "next-auth"; // External dependency for session management

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Internal authentication options
import { getPlayListAction } from "@/app/actions/podcastActions"; // Internal function for fetching playlist data

import PlaylistPodcast from "./_components/Playlist-podcast"; // Internal component for displaying playlist podcasts
import SideScrollPlaylistPodcasts from "./_components/side-scroll-playlist-podcasts"; // Internal component for side scrolling podcasts
import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";

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

  const t = await getTranslations("Index");

  return (
    <MaxWidthContainer className="flex flex-col lg:flex-row-reverse lg:gap-5 lg:justify-center relative pt-10 min-h-[calc(100vh-72px)] lg:px-8">
      {data?.playlist?.podcasts?.length > 0 ? (
        <Fragment>
          <PlaylistPodcast
            params={params}
            searchParams={searchParams}
            podcasts={data?.playlist?.podcasts!}
            playlistName={data?.playlist?.name!}
          />
          <SideScrollPlaylistPodcasts
            podcasts={data?.playlist?.podcasts!}
            playlistName={data?.playlist?.name!}
          />
        </Fragment>
      ) : (
        <div className="w-full h-[clac(100vh-72px)] flex flex-col justify-center items-center gap-56">
          <h2 className="text-center font-medium text-5xl justify-self-start capitalize">
            {data?.playlist?.name}
          </h2>
          <p className="text-center font-medium text-3xl italic opacity-80">
            {t("no-podcasts-in-this-playlist-yet")}
          </p>
        </div>
      )}
    </MaxWidthContainer>
  );
}
