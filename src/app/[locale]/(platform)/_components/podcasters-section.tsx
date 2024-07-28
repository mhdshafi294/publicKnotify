import { getPodcastersAction } from "@/app/actions/podcasterActions";
import InfiniteScrollPodcasterersCarousel from "@/components/infinite-scroll-podcasters-carousel";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";

const PodcastersSection = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const firstPageTrendingResponse = await getPodcastersAction({
    type: params.userType,
  });

  return (
    <MaxWidthContainer className="w-full">
      <InfiniteScrollPodcasterersCarousel
        initialData={firstPageTrendingResponse.podcasters}
        type={params.userType}
      />
    </MaxWidthContainer>
  );
};

export default PodcastersSection;
