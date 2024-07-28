import { getTrendingAction } from "@/app/actions/podcastActions";
import InfiniteScrollPodcasts from "@/components/infinite-scroll-podcasts";
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

const TrendingSection = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const locale = useLocale();

  const firstPageTrendingResponse = await getTrendingAction({
    type: params.userType,
  });

  // console.log(data);

  return (
    <MaxWidthContainer className="w-full">
      <InfiniteScrollPodcasts
        initialData={firstPageTrendingResponse.podcasts}
        type={params.userType}
      />
    </MaxWidthContainer>
  );
};

export default TrendingSection;
