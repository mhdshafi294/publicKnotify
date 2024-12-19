"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import { formatTime } from "@/lib/utils";
import { Link } from "@/navigation";
import { Podcaster } from "@/types/podcaster";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Clock, Heart, Music2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function TrendyPodcasterCarousel({
  podcasters = [],
}: {
  podcasters?: Podcaster[];
}) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);

  const { data: session } = useSession();

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-semibold ">Trendy</h2>
      <Carousel ref={emblaRef} className="w-full overflow-hidden">
        <CarouselContent>
          {podcasters.map((podcaster) => (
            <CarouselItem key={podcaster?.id}>
              <Card className="border-0 overflow-hidden bg-gradient-to-b from-greeny/50 to-transparent  rounded-none lg:h-60 bg-transparent">
                <CardContent className="p-0">
                  <div className="flex items-center gap-6 p-6">
                    <div className="relative size-48 flex-shrink-0 overflow-hidden rounded-none shadow-[0px_0px_29.68px_0px_rgba(5,5,5,0.61)]">
                      <Image
                        src={podcaster.image || "/podcaster-filler.webp"}
                        alt={podcaster.full_name}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center h-48">
                      <div className="my-auto">
                        <Link
                          href={`/${session?.user?.type}/profile/podcaster/${podcaster?.id}`}
                          className="text-3xl font-bold text-white mb-2 hover:underline duration-200"
                        >
                          {podcaster.full_name}
                        </Link>
                        <p className="text-white/80">
                          {podcaster.categories
                            .map((cat) => cat.name)
                            .join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60 mt-auto">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{podcaster?.total_likes} likes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Music2 className="w-4 h-4" />
                          <span>{podcaster?.podcasts_count} episode</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(podcaster.total_time)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="left-4" /> */}
        <CarouselNext className="right-4 size-5 !border-white" />
      </Carousel>
    </div>
  );
}
