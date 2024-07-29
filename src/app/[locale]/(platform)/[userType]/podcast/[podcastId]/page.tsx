import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import getPodcastDetails from "@/services/podcast/get-podcast-details";
import AudioPodcast from "../_components/audio-podcast";

const Page = async ({
  params,
}: {
  params: { podcastId: string; userType: string };
}) => {
  const podcast = await getPodcastDetails(params.userType, +params.podcastId);
  return (
    <MaxWidthContainer className="mt-8">
      {podcast.type === "audio" ? (
        <AudioPodcast podcast={podcast} />
      ) : (
        <div className="bg-secondary space-y-6 p-8 rounded-xl">pkpkp</div>
      )}
    </MaxWidthContainer>
  );
};

export default Page;
