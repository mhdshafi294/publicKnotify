import { useTranslations } from "next-intl";
import InfiniteScrollPlaylistPodcasts from "./_components/side-scroll-playlist-podcasts";
import { getPlayListAction } from "@/app/actions/podcastActions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function PlaylistPage({
  params,
}: {
  params: { userType: string; playlistId: string };
}) {
  const session = await getServerSession(authOptions);

  const data = await getPlayListAction({
    type: session?.user?.type!,
    id: params.playlistId,
  });
  // console.log(data);

  return (
    <div className="flex relative pt-10 min-h-[calc(100vh-72px)]">
      {/* <CreatePodcastForm setIsShow={setIsShow} /> */}
      <InfiniteScrollPlaylistPodcasts podcasts={data?.playlist?.podcasts!} />
    </div>
  );
}
