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
import {
  useInfiniteQuery
} from "@tanstack/react-query";

const TrendingSection = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { isPending, isError, error, data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["trending"],
      queryFn: ({ pageParam }) =>
        getTrendingAction({
          count: "10",
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

  console.log(data);

  return (
    <div className="w-full space-y-5">
      <Carousel opts={{ slidesToScroll: "auto" }} className="">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Trending Podcasts</h2>
          <div className="flex relative justify-end items-center end-[80px]">
            <CarouselPrevious />
            <CarouselNext onClick={() => fetchNextPage()} />
          </div>
        </div>
        <CarouselContent className="w-full mt-5">
          {isPending ? (
            Array(10)
              .fill(0)
              .map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <PodcastCardLoading />
                </CarouselItem>
              ))
          ) : data?.pages[0].podcasts.length === 0 ? (
            <p>No podcasts to load</p>
          ) : (
            data?.pages.map((page) =>
              page.podcasts.map((podcast) => (
                <CarouselItem
                  key={podcast.id}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <PodcastCard podcast={podcast} />
                </CarouselItem>
              ))
            )
          )}
          {isFetchingNextPage &&
            Array(20)
              .fill(0)
              .map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <PodcastCardLoading />
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TrendingSection;
