import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import AudioPodcast from "../_components/audio-podcast";
import VideoPodcast from "../_components/video-podcast";
import { getPodcastDetailsAction } from "@/app/actions/podcastActions";

const Page = async ({
  params,
}: {
  params: { podcastId: string; userType: string };
}) => {
  const podcast = await getPodcastDetailsAction({
    type: params.userType,
    id: params.podcastId,
  });
  return (
    <MaxWidthContainer className="mt-8 flex justify-center items-center">
      {podcast.type === "audio" ? (
        <AudioPodcast podcast={podcast} />
      ) : (
        <VideoPodcast podcast={podcast} />
      )}
    </MaxWidthContainer>
  );
};

export default Page;
