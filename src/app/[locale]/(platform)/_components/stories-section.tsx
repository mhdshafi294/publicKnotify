import { getTrendingAction } from "@/app/actions/podcastActions";
import { getStoriesAction } from "@/app/actions/storyActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import InfiniteScrollPodcastsCarousel from "@/components/infinite-scroll-podcasts-carousel";
import InfiniteScrollStoriesCarousel from "@/components/infinite-scroll-stories-carousel";

import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";

const StoriesSection = async ({
  params,
  searchParams,
}: {
  params?: { userType: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  const firstPageStoriesResponse = await getStoriesAction({
    type: session?.user?.type!,
  });

  if (
    firstPageStoriesResponse?.stories?.length === 0 ||
    !firstPageStoriesResponse
  ) {
    return null;
  }

  return (
    <MaxWidthContainer className="w-full">
      <InfiniteScrollStoriesCarousel
        initialData={firstPageStoriesResponse}
        type={session?.user?.type!}
      />
    </MaxWidthContainer>
  );
};

export default StoriesSection;
