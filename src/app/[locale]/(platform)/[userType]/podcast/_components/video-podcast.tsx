import { Badge } from "@/components/ui/badge";
import { Link } from "@/navigation";
import { PodcastDetails } from "@/types/podcast";
import { FC } from "react";

type PropsType = {
  podcast: PodcastDetails;
};
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
          <div className="fleex justify-start items-center flex-wrap">
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
