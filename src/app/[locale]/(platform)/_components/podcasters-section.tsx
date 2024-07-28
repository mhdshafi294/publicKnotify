"use client";

import { getPodcastersAction } from "@/app/actions/podcasterActions";
import {
  PodcasterCard,
  PodcasterCardLoading,
} from "@/components/podcaster-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { getDirection } from "@/lib/utils";
import getPodcasters from "@/services/podcaster/get-podcasters";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

const PodcastersSection = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const locale = useLocale();
  const direction = getDirection(locale);

  const { isPending, isError, error, data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["topPodcasters"],
      queryFn: ({ pageParam }) =>
        getPodcastersAction({
          count: "60",
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

  return (
    <MaxWidthContainer className="w-full">
      <Carousel opts={{ slidesToScroll: "auto", direction }} className="w-full">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Top Podcasters</h2>
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
                  className="basis-1/2 md:basis-1/4 lg:basis-1/6 ps-0"
                >
                  <PodcasterCardLoading />
                </CarouselItem>
              ))
          ) : data?.pages[0].podcasters.length === 0 ? (
            <p className="text-lg my-auto opacity-50 italic ">
              No podcasters yet
            </p>
          ) : (
            data?.pages.map((page) =>
              page.podcasters.map((podcaster) => (
                <CarouselItem
                  key={podcaster.id}
                  className="basis-1/2 md:basis-1/4 lg:basis-1/6 ps-0"
                >
                  <PodcasterCard podcaster={podcaster} />
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
                  className="basis-1/2 md:basis-1/4 lg:basis-1/6 ps-0"
                >
                  <PodcasterCardLoading />
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </MaxWidthContainer>
  );
};

export default PodcastersSection;
