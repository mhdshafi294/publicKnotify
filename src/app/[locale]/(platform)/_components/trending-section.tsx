"use client";

import { getTrendingAction } from "@/app/actions/podcastActions";
import { PodcastCard, PodcastCardLoading } from "@/components/podcast-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loader from "@/components/ui/loader";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { getDirection } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

const TrendingSection = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const locale = useLocale();
  const direction = getDirection(locale);
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  const { isPending, isError, error, data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["trending"],
      queryFn: ({ pageParam }) =>
        getTrendingAction({
          count: "50",
          page: pageParam.toString(),
          type: params.userType as string,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination.next_page_url) {
          return lastPage.pagination.current_page + 1;
        } else {
          undefined;
        }
      },
    });

  if (isError) {
    console.log(error);
    return <div>Something went wrong. Please try again</div>;
  }

  // console.log(data);

  return (
    <MaxWidthContainer className="w-full">
      <Carousel opts={{ slidesToScroll: "auto", direction }} className="w-full">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Trending Podcasts</h2>
          <div className="flex relative justify-end items-center end-[80px]">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
        <CarouselContent className="w-full mt-5 ms-0 min-h-56">
          {isPending ? (
            Array(10)
              .fill(0)
              .map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/4 xl:basis-1/5 ps-0"
                >
                  <PodcastCardLoading />
                </CarouselItem>
              ))
          ) : data?.pages[0].podcasts.length === 0 ? (
            <p className="text-lg my-auto opacity-50 italic ">
              No podcasts yet
            </p>
          ) : (
            data?.pages.map((page) =>
              page.podcasts.map((podcast) => (
                <CarouselItem
                  key={podcast.id}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/4 xl:basis-1/5 ps-0"
                >
                  <PodcastCard podcast={podcast} />
                </CarouselItem>
              ))
            )
          )}
          {
            <CarouselItem
              ref={ref}
              className="basis-1/2 md:basis-1/3 lg:basis-1/12 ps-0 flex justify-center items-center"
            >
              {isFetchingNextPage && (
                <Loader className="size-9" variant={"infinity"} />
              )}
              <span className="sr-only">Loading...</span>
            </CarouselItem>
          }
        </CarouselContent>
      </Carousel>
    </MaxWidthContainer>
  );
};

export default TrendingSection;
