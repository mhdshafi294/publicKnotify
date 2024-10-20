import { getPodcastersAction } from "@/app/actions/podcasterActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import InfiniteScrollPodcasterersCarousel from "@/components/infinite-scroll-podcasters-carousel";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { getServerSession } from "next-auth";

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
    <MaxWidthContainer className="w-full">
      <InfiniteScrollPodcasterersCarousel
        initialData={firstPageTrendingResponse.podcasters}
        type={session?.user?.type!}
      />
    </MaxWidthContainer>
  );
};

export default PodcastersSection;
