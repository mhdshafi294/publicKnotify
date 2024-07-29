import PodcastersSection from "@/app/[locale]/(platform)//_components/podcasters-section";
import CategorySecrtion from "@/app/[locale]/(platform)/_components/category-secrtion";
import TrendingSection from "@/app/[locale]/(platform)/_components/trending-section";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";
import CompaniesSection from "../_components/Companies-section";
import { getSearchAction } from "@/app/actions/podcastActions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import InfiniteScrollPodcastsCarousel from "@/components/infinite-scroll-podcasts-carousel";
import InfiniteScrollPodcasterersCarousel from "@/components/infinite-scroll-podcasters-carousel";
import Search from "@/components/search";
import InfiniteScrollPlaylistsCarousel from "@/components/infinite-scroll-playlists-carousel";
import InfiniteScrollCompanies from "@/components/infinite-scroll-companies";
import { SearchResponse } from "@/types/podcast";
import { getCompaniesAction } from "@/app/actions/companyActions";
import { CompaniesResponse } from "@/types/company";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const initData: SearchResponse | CompaniesResponse;

  if (session?.user?.type !== "podcaster") {
    initData = await getSearchAction({
      search,
      type: session?.user?.type!,
    });
  } else {
    initData = await getCompaniesAction({
      type: session?.user?.type!,
      search,
    });
  }

  const content = () => {
    if (session?.user?.type !== "podcaster")
      return (
        <div className="flex flex-col gap-7">
          <InfiniteScrollPodcastsCarousel
            initialData={initData.search.podcasts.data}
            type={session?.user?.type!}
            search={search}
          />
          <InfiniteScrollPlaylistsCarousel
            initialData={initData.search.playLists.data}
            type={session?.user?.type!}
            search={search}
          />
          <InfiniteScrollPodcasterersCarousel
            initialData={initData.search.podcasters.data}
            type={session?.user?.type!}
            search={search}
          />
        </div>
      );
    else
      return (
        <MaxWidthContainer className="space-y-4">
          <h2 className="px-3 font-bold text-3xl capitalize">
            trending Companies
          </h2>
          <InfiniteScrollCompanies initialRequests={data.companies} />
        </MaxWidthContainer>
      );
  };

  return (
    <main className="flex flex-col items-start justify-start gap-6 w-full mt-8 mb-2">
      <MaxWidthContainer className="w-full">
        <div className="w-full flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Search</h1>
          <Search searchText={search} searchFor="search" />
        </div>
        {content()}
      </MaxWidthContainer>
    </main>
  );
}
