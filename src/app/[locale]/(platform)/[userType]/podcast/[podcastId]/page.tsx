import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import getPodcastDetails from "@/services/podcast/get-podcast-details";
import AudioPodcast from "../_components/audio-podcast";
import VideoPodcast from "../_components/video-podcast";

const Page = async ({
  params,
}: {
  params: { podcastId: string; userType: string };
}) => {
  const podcast = await getPodcastDetails(params.userType, +params.podcastId);
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
