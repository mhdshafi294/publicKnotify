import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { PodcasterCard2 } from "@/components/podcaster-card2";
import { Podcaster } from "@/types/podcaster";

export default async function FeaturedPodcastersGrid({
  podcasters,
  type,
}: {
  podcasters: Podcaster[];
  type: string;
}) {
  const t = await getTranslations("Index");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl capitalize">{t("podcasters")}</h2>
        <div className="flex relative justify-end items-center">
          {/* Link to view all podcasters */}
          <Link
            href={{
              pathname: `${type}/podcasters`,
            }}
            className="flex gap-2 items-center text-card-foreground/50 hover:text-card-foreground/100 duration-200"
          >
            <p className="font-semibold">{t("viewAll")}</p>
            <SquareArrowOutUpRightIcon size={14} />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-1 lg:gap-2 w-full mx-auto lg:max-h-[305px]">
        {/* First tall card */}
        <PodcasterCard2
          podcaster={podcasters[0]}
          className="lg:row-span-2 row-span-3 min-h-[150px]"
          // contentRatio="lg:h-full"
        />

        {/* Two small cards */}
        <PodcasterCard2
          podcaster={podcasters[1]}
          className="lg:row-span-1 row-span-2 min-h-[100px] lg:min-h-[150px]"
          // contentRatio="lg:aspect-square"
        />
        <PodcasterCard2
          podcaster={podcasters[2]}
          className="lg:col-start-2 lg:row-span-1 lg:row-start-2 row-span-3 col-start-2 row-start-3 min-h-[150px]"
          // contentRatio="lg:aspect-square"
        />

        {/* Second tall card */}
        <PodcasterCard2
          podcaster={podcasters[3]}
          className="lg:row-span-2 lg:col-start-3 lg:row-start-1 row-span-2 row-start-4 min-h-[100px] lg:min-h-[150px]"
          // contentRatio="lg:h-full"
        />
        <PodcasterCard2
          podcaster={podcasters[4]}
          className="lg:row-span-2 lg:col-start-4 lg:row-start-1 row-span-3 row-start-6 min-h-[150px]"
          // contentRatio="lg:h-full"
        />

        {/* Two more small cards */}
        <PodcasterCard2
          podcaster={podcasters[5]}
          className="lg:col-start-5 lg:row-start-1 lg:row-span-1 row-span-2 row-start-6 min-h-[100px] lg:min-h-[150px]"
          // contentRatio="lg:aspect-square"
        />
        <PodcasterCard2
          podcaster={podcasters[6]}
          className="lg:col-start-5 lg:row-start-2 lg:row-span-1 row-span-3 col-start-2 row-start-8 min-h-[150px]"
          // contentRatio="lg:aspect-square"
        />

        {/* Final tall card */}
        <PodcasterCard2
          podcaster={podcasters[7]}
          className="lg:row-span-2 lg:col-start-6 lg:row-start-1 row-span-2 row-start-9 min-h-[100px] lg:min-h-[150px]"
          // contentRatio="lg:h-full"
        />
      </div>
    </div>
  );
}
