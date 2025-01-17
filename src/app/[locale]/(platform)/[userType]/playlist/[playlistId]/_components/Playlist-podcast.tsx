// Global imports
import { getServerSession } from "next-auth"; // External dependency for session management
import { getTranslations } from "next-intl/server"; // External dependency for internationalization

// Local imports
import AudioPodcast from "@/app/[locale]/(platform)/[userType]/podcast/_components/audio-podcast"; // Internal component import
import VideoPodcast from "@/app/[locale]/(platform)/[userType]/podcast/_components/video-podcast"; // Internal component import
import { getPodcastDetailsAction } from "@/app/actions/podcastActions"; // Internal action import
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"; // Internal authentication options
import MaxWidthContainer from "@/components/ui/MaxWidthContainer"; // Internal component import
import { SelfPodcastDetails } from "@/types/podcast"; // Internal type definitions

/**
 * PlaylistPodcast Component
 *
 * This component displays either an audio or video podcast based on the `podcast.type`.
 * It fetches the podcast details based on the `searchParams.podcast_id` or defaults
 * to the first podcast in the list if no ID is provided. It also uses `MaxWidthContainer`
 * to ensure proper layout and responsiveness.
 *
 * @param {Object} params - Route parameters.
 * @param {string} params.userType - The user type (e.g., "user", "admin").
 * @param {string} params.playlistId - The ID of the playlist.
 * @param {Object} searchParams - Query parameters from the URL.
 * @param {Object} searchParams.podcast_id - The ID of the selected podcast.
 * @param {SelfPodcastDetails[]} podcasts - List of podcasts available in the playlist.
 * @returns {JSX.Element} The rendered component, which either displays an audio or video podcast.
 */
const PlaylistPodcast = async ({
  params,
  searchParams,
  podcasts,
  playlistName,
}: {
  params: { userType: string; playlistId: string };
  searchParams: { [key: string]: string | string[] | undefined };
  podcasts: SelfPodcastDetails[];
  playlistName: string;
}) => {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("Index");

  const podcast = await getPodcastDetailsAction({
    type: session?.user?.type as string,
    id:
      typeof searchParams.podcast_id === "string"
        ? searchParams.podcast_id
        : podcasts[0]?.id.toString(),
  });

  return (
    <MaxWidthContainer className=" flex justify-center lg:justify-start flex-col gap-4 max-w-[680px] h-md:max-w-[920px] lg:px-0 lg:mx-0">
      <h2 className="text-3xl font-bold capitalize w-fit">{playlistName}</h2>
      {podcast.type === "audio" ? (
        <AudioPodcast podcast={podcast} />
      ) : (
        <VideoPodcast podcast={podcast} />
      )}
    </MaxWidthContainer>
  );
};

export default PlaylistPodcast;
