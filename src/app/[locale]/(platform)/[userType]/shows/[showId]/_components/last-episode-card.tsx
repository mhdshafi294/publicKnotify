import React from "react";
import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import DashboardCardContainer from "../../_components/dashboard-card-container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

type LastEpisodeCardProps = {
  imgSrc: string;
  title: string;
  showId: string;
  episodeId: string;
  publishDate: string;
};

/**
 * The LastEpisodeCard component displays the latest episode's information, including the thumbnail,
 * title, and publication date. It also provides quick actions via a dropdown menu.
 *
 * @param {LastEpisodeCardProps} props - The props for the component.
 * @param {string} props.imgSrc - The source URL for the episode thumbnail image.
 * @param {string} props.title - The title of the episode.
 * @param {string} props.showId - The ID of the show the episode belongs to.
 * @param {string} props.episodeId - The ID of the episode.
 * @param {string} props.publishDate - The publication date of the episode.
 *
 * @returns {JSX.Element} The rendered LastEpisodeCard component.
 */
const LastEpisodeCard: React.FC<LastEpisodeCardProps> = ({
  imgSrc,
  title,
  showId,
  episodeId,
  publishDate,
}) => {
  const t = useTranslations("Index");

  return (
    <DashboardCardContainer className="lg:h-[170px] flex justify-between sm:items-center">
      {/* Episode Thumbnail and Details */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <Image
          src={imgSrc}
          alt={t("last-published-episode-thumbnail")}
          width={200}
          height={200}
          className="size-[107px] object-cover"
        />
        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm opacity-75 uppercase">
            {t("latest-episode")}
          </p>
          <Link href={`/podcaster/shows/${showId}/episodes/${episodeId}`}>
            <h2 className="font-bold hover:underline">{title}</h2>
          </Link>
          <p className="opacity-50 text-xs">
            {t("published-from")}{" "}
            {formatDistanceToNow(new Date(publishDate), {
              addSuffix: false,
            })}{" "}
            {t("ago-on")} {format(new Date(publishDate), "PPP")}
          </p>
        </div>
      </div>

      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            variant: "outline",
            size: "icon",
            className: "text-white/70",
          })}
        >
          <EllipsisIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-card-secondary border-input">
          <Link href={`/podcaster/shows/${showId}/episodes/${episodeId}`}>
            <DropdownMenuItem>{t("episode-details")}</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </DashboardCardContainer>
  );
};

export default LastEpisodeCard;
