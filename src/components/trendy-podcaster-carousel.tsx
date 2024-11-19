"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Clock, Heart, Music2 } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Podcaster } from "@/types/podcaster";

export default function TrendyPodcasterCarousel({
  podcasters = [],
}: {
  podcasters?: Podcaster[];
}) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-semibold text-white">Trendy</h2>
      <Carousel ref={emblaRef} className="w-full">
        <CarouselContent>
          {podcasters.map((podcaster) => (
            <CarouselItem key={podcaster.id}>
              <Card className="border-0 overflow-hidden bg-gradient-to-b from-card/90 to-green-500/90 rounded-none lg:h-60">
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
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {podcaster.full_name}
                        </h3>
                        <p className="text-white/80">
                          {podcaster.categories
                            .map((cat) => cat.name)
                            .join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60 mt-auto">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>3,940,865 likes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Music2 className="w-4 h-4" />
                          <span>252 songs</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>about 10 hr</span>
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
