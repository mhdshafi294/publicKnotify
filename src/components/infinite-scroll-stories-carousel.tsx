"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import { getStoriesAction } from "@/app/actions/storiesActions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Loader from "@/components/ui/loader";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { getDirection } from "@/lib/utils";
import { StoriesResponse } from "@/types/stories";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import StoryTriggerItem from "@/app/[locale]/(platform)/[userType]/stories/_components/story-trigger-item";
import StoriesViewerDialog from "@/app/[locale]/(platform)/[userType]/stories/_components/stories-viewer-dialog";

interface InfiniteScrollStoriesCarouselProps {
  initialData: StoriesResponse;
  search?: string;
  type: string;
}

const InfiniteScrollStoriesCarousel: React.FC<
  InfiniteScrollStoriesCarouselProps
> = ({ initialData, search, type }) => {
  const locale = useLocale();
  const t = useTranslations("Index");
  const direction = getDirection(locale);
  const [currentPodcasterIndex, setCurrentPodcasterIndex] = useState<
    number | null
  >(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  const { data: session } = useSession();
  const { setIsStoryReviewDialogOpen } = useAddStoryDialogsStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["trending_stories", { type, search }],
      queryFn: async ({ pageParam = 1 }) => {
        const response: StoriesResponse = await getStoriesAction({
          type,
          page: pageParam.toString(),
        });
        return {
          stories: response.stories,
          pagination: {
            ...response.pagination,
            next_page_url: response.pagination.next_page_url,
            prev_page_url: response.pagination.prev_page_url,
          },
        };
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination.next_page_url) {
          return lastPage.pagination.current_page + 1;
        } else {
          return undefined;
        }
      },
      initialPageParam: 1,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
    });

  useEffect(() => {
    if (!isFetchingNextPage && hasNextPage && isIntersecting) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, isIntersecting, fetchNextPage]);

  const handleFinishStories = useCallback(() => {
    const allStories = data?.pages.flatMap((page) => page.stories) || [];
    if (
      currentPodcasterIndex !== null &&
      currentPodcasterIndex < allStories.length - 1
    ) {
      setCurrentPodcasterIndex(currentPodcasterIndex + 1);
      setCurrentStoryIndex(0);
      setIsStoryReviewDialogOpen(true);
    } else {
      setCurrentPodcasterIndex(null);
      setCurrentStoryIndex(0);
      setIsStoryReviewDialogOpen(false);
    }
  }, [currentPodcasterIndex, data, setIsStoryReviewDialogOpen]);

  const handleActivateStory = useCallback(
    (index: number, firstUnreadIndex: number) => {
      setCurrentPodcasterIndex(index);
      setCurrentStoryIndex(firstUnreadIndex);
    },
    []
  );

  const allStories = data?.pages.flatMap((page) => page.stories) || [];

  return (
    <Carousel opts={{ slidesToScroll: "auto", direction }} className="w-full">
      {/* <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">{t("stories")}</h2>
      </div> */}
      <CarouselContent className="w-full mt-2 ms-0 gap-3">
        {allStories.length === 0 ? (
          <p className="text-lg my-auto opacity-70 dark:opacity-50 italic">
            {t("noStoriesYet")}
          </p>
        ) : (
          allStories.map((storyGroup, index) => (
            <CarouselItem
              key={storyGroup.podcaster.id}
              className="basis-1/5 md:basis-1/6 lg:basis-[9%] xl:basis-[7%] ps-0"
            >
              <StoryTriggerItem
                storyGroup={storyGroup}
                index={index}
                isActive={index === currentPodcasterIndex}
                onActivate={handleActivateStory}
                onFinish={handleFinishStories}
              />
            </CarouselItem>
          ))
        )}
        <CarouselItem
          ref={ref}
          className="basis-1/5 md:basis-1/6 lg:basis-1/8 xl:basis-1/10 ps-0 flex justify-center items-center"
        >
          {isFetchingNextPage && (
            <Loader className="size-9" variant={"infinity"} />
          )}
          <span className="sr-only">{t("loading")}</span>
        </CarouselItem>
      </CarouselContent>
      {currentPodcasterIndex !== null && (
        <StoriesViewerDialog
          storyGroup={allStories[currentPodcasterIndex]}
          allStories={allStories}
          currentIndex={currentPodcasterIndex}
          initialStoryIndex={currentStoryIndex}
          onIndexChange={setCurrentPodcasterIndex}
          onFinish={handleFinishStories}
        />
      )}
    </Carousel>
  );
};

export default InfiniteScrollStoriesCarousel;
