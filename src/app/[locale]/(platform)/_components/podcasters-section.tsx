import { getPodcastersAction } from "@/app/actions/podcasterActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { getServerSession } from "next-auth";
import FeaturedPodcastersGrid from "./featured-podcasters-grid";

const PodcastersSection = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  const firstPageTrendingResponse = await getPodcastersAction({
    type: session?.user?.type!,
  });

  return (
    <MaxWidthContainer className="w-full mb-5">
      {/* <InfiniteScrollPodcasterersCarousel
        initialData={firstPageTrendingResponse.podcasters}
        type={session?.user?.type!}
      /> */}
      <FeaturedPodcastersGrid
        podcasters={firstPageTrendingResponse.podcasters}
        type={session?.user?.type!}
      />
    </MaxWidthContainer>
  );
};

export default PodcastersSection;
