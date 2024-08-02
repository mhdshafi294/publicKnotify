import { useTranslations } from "next-intl";
import { getPlayListAction } from "@/app/actions/podcastActions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import PlaylistPodcast from "./_components/Playlist-podcast";
import SideScrollPlaylistPodcasts from "./_components/side-scroll-playlist-podcasts";

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
