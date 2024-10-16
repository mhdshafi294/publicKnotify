import { getTrendingAction } from "@/app/actions/podcastActions";
import InfiniteScrollPodcastsCarousel from "@/components/infinite-scroll-podcasts-carousel";

import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { redirect } from "@/navigation";

const TrendingSection = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const firstPageTrendingResponse = await getTrendingAction({
    type: params.userType,
  });

  if (firstPageTrendingResponse.message === "Unauthenticated.") {
    redirect("/sign-in");
  }

  // console.log(data);

  return (
    <MaxWidthContainer className="w-full">
      <InfiniteScrollPodcastsCarousel
        initialData={firstPageTrendingResponse.podcasts}
        type={params.userType}
      />
    </MaxWidthContainer>
  );
};

export default TrendingSection;
