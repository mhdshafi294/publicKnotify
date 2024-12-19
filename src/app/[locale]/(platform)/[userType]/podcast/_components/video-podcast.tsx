import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Badge } from "@/components/ui/badge"; // Internal UI component import
import { Link } from "@/navigation"; // Internal navigation import
import { PodcastDetails } from "@/types/podcast"; // Internal type import
import { getServerSession } from "next-auth";
import { FC } from "react";
import VideoPlayer from "./video-player"; // Import the client component

// Props interface for VideoPodcast
interface PropsType {
  podcast: PodcastDetails;
}

/**
 * VideoPodcast Component
 *
 * This component displays details of a video podcast, including the video player,
 * podcast name, podcaster's link, creation date, hashtags, and a summary.
 *
 * @param {Object} props - Component properties.
 * @param {PodcastDetails} props.podcast - The details of the podcast to display.
 * @returns {JSX.Element} The rendered component with video podcast details.
 */
const VideoPodcast: FC<PropsType> = async ({ podcast }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-card-secondary space-y-4 py-6 pt-0 px-0 rounded-xl mb-5 w-full">
      {/* Video player */}
      <VideoPlayer
        podcastId={podcast?.id}
        thumbnail={podcast.thumbnail}
        src={podcast.podcast}
        playback_position={podcast.playback_position}
      />

      <div className="flex justify-between items-center px-6">
        <div className="space-y-2">
          <div className="flex items-end gap-5 w-full">
            <h1 className="text-2xl md:text-3xl capitalize font-bold">
              {podcast.name}
            </h1>
            <div className="flex justify-start items-center flex-wrap gap-1">
              {podcast.hashTags.map((tag) => (
                <Badge
                  className="bg-greeny/20 text-greeny hover:bg-greeny/30 hover:text-greeny cursor-default"
                  key={tag?.id}
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          </div>
          <Link
            href={`/${session?.user?.type}/profile/podcaster/${podcast.podcaster?.id}`}
            className="inline-block text-greeny/90 font-bold capitalize hover:underline"
          >
            {podcast.podcaster.full_name}
          </Link>

          <p className="text-sm opacity-70">{podcast.summary}</p>
          <p className="text-xs opacity-70 dark:opacity-50">
            {podcast.created_at.split(" ")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPodcast;
