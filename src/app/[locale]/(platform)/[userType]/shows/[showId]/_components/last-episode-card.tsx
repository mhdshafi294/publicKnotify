import React from "react";
import Image from "next/image";
import { formatDate, formatDistanceToNow } from "date-fns";

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

const LastEpisodeCard: React.FC<LastEpisodeCardProps> = ({
  imgSrc,
  title,
  showId,
  episodeId,
  publishDate,
}) => {
  return (
    <DashboardCardContainer className="lg:h-[170px] flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Image
          src={imgSrc}
          alt="last published podcast thumbnail"
          width={200}
          height={200}
          className="size-[107px] object-cover"
        />
        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm opacity-75 uppercase">
            Lastest Episode
          </p>
          <Link href={`/podcaster/shows/${showId}/episodes/${episodeId}`}>
            <h2 className="font-bold hover:underline">{title}</h2>
          </Link>
          <p className="opacity-50 text-xs">
            {"published from "}
            {formatDistanceToNow(new Date(publishDate), {
              addSuffix: false,
            })}
            {" ago on "}
            {formatDate(new Date(publishDate), "PPP")}
          </p>
        </div>
      </div>
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
            <DropdownMenuItem>Episode Details</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </DashboardCardContainer>
  );
};

export default LastEpisodeCard;
