import { FC } from "react"; // Core React import

import { Badge } from "@/components/ui/badge"; // Internal UI component import
import { Link } from "@/navigation"; // Internal navigation import
import { PodcastDetails } from "@/types/podcast"; // Internal type import

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
const VideoPodcast: FC<PropsType> = ({ podcast }) => {
  return (
    <div className="bg-secondary w-full xl:w-10/12 mx-auto space-y-4 p-3 md:p-6 rounded-xl">
      <div className="mx-auto aspect-video relative">
        <video
          className="size-full object-cover rounded-md"
          controlsList="nodownload"
          poster={podcast.thumbnail}
          src={podcast.podcast}
          controls
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl capitalize font-bold">
            {podcast.name}
          </h1>
          <Link
            href={`/podcaster/profile/${podcast.podcaster.id}`}
            className="inline-block text-greeny capitalize hover:underline"
          >
            {podcast.podcaster.full_name}
          </Link>
          <p>{podcast.created_at.split(" ")[0]}</p>
          <div className="flex justify-start items-center flex-wrap">
            {podcast.hashTags.map((tag) => (
              <Badge className="bg-greeny text-background" key={tag.id}>
                #{tag.name}
              </Badge>
            ))}
          </div>
          <p className="text-sm">{podcast.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPodcast;
