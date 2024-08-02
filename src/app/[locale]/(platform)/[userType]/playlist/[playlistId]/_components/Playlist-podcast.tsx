import MaxWidthContainer from "@/components/ui/MaxWidthContainer";

import { getPodcastDetailsAction } from "@/app/actions/podcastActions";
import AudioPodcast from "@/app/[locale]/(platform)/[userType]/podcast/_components/audio-podcast";
import VideoPodcast from "@/app/[locale]/(platform)/[userType]/podcast/_components/video-podcast";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { SelfPodcastDetails } from "@/types/podcast";

const PlaylistPodcast = async ({
  params,
  searchParams,
  podcasts,
}: {
  params: { userType: string; playlistId: string };
  searchParams: { [key: string]: string | string[] | undefined };
  podcasts: SelfPodcastDetails[];
}) => {
  const session = await getServerSession(authOptions);

  // console.log(searchParams.podcast_id, "searchParams.podcast_id");

  const podcast = await getPodcastDetailsAction({
    type: session?.user?.type as string,
    id:
      typeof searchParams.podcast_id === "string"
        ? searchParams.podcast_id
        : podcasts[0].id.toString(),
  });

  // console.log(podcast, "podcast");

  return (
    <MaxWidthContainer className="lg:ms-[20dvw] flex justify-center items-center">
      {podcast.type === "audio" ? (
        <AudioPodcast podcast={podcast} />
      ) : (
        <VideoPodcast podcast={podcast} />
      )}
    </MaxWidthContainer>
  );
};

export default PlaylistPodcast;
