// Local imports
import MaxWidthContainer from "@/components/ui/MaxWidthContainer"; // Internal component import
import AudioPodcast from "../_components/audio-podcast"; // Internal component import
import VideoPodcast from "../_components/video-podcast"; // Internal component import
import { getPodcastDetailsAction } from "@/app/actions/podcastActions"; // Internal action import

/**
 * PodcastPage Component
 *
 * This component fetches and displays details of a specific podcast based on
 * the podcast ID and user type provided in the parameters. It renders either
 * an audio or video podcast component based on the type of podcast.
 *
 * @param {Object} params - Route parameters.
 * @param {string} params.podcastId - The ID of the podcast to fetch details for.
 * @param {string} params.userType - The type of the user (e.g., "listener" or "creator").
 * @returns {JSX.Element} The rendered component displaying either an AudioPodcast or VideoPodcast.
 */
const PodcastPage = async ({
  params,
}: {
  params: { podcastId: string; userType: string };
}) => {
  // Fetch podcast details using the provided parameters
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

export default PodcastPage;
