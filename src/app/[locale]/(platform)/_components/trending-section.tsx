import { getTrendingAction } from "@/app/actions/podcastActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import InfiniteScrollPodcastsCarousel from "@/components/infinite-scroll-podcasts-carousel";

import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { getServerSession } from "next-auth";

const TrendingSection = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  const firstPageTrendingResponse = await getTrendingAction({
    type: session?.user?.type!,
  });

  return (
    <MaxWidthContainer className="w-full">
      <InfiniteScrollPodcastsCarousel
        initialData={firstPageTrendingResponse.podcasts}
        type={session?.user?.type!}
      />
    </MaxWidthContainer>
  );
};

export default TrendingSection;
