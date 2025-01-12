import { getPodcastersAction } from "@/app/actions/podcasterActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import TrendyPodcasterCarousel from "@/components/trendy-podcaster-carousel";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { getServerSession } from "next-auth";

const TrendyPodcasterCarouselSection = async ({
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
      <TrendyPodcasterCarousel
        podcasters={firstPageTrendingResponse.podcasters}
      />
    </MaxWidthContainer>
  );
};

export default TrendyPodcasterCarouselSection;
