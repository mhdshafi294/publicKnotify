import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";
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
  let initData: SearchResponse;
  let companiesInitData: CompaniesResponse;

  if (session?.user?.type !== "podcaster") {
    initData = await getSearchAction({
      search,
      type: session?.user?.type!,
    });
  } else {
    companiesInitData = await getCompaniesAction({
      type: session?.user?.type!,
      search,
    });
  }

  const content = () => {
    if (session?.user?.type !== "podcaster")
      return (
        <>
          <InfiniteScrollPlaylistsCarousel
            initialData={initData.search.playLists.data}
            type={session?.user?.type!}
            search={search}
          />
          <InfiniteScrollPodcastsCarousel
            initialData={initData.search.podcasts.data}
            type={session?.user?.type!}
            search={search}
          />
          <InfiniteScrollPodcasterersCarousel
            initialData={initData.search.podcasters.data}
            type={session?.user?.type!}
            search={search}
          />
        </>
      );
    else
      return (
        <>
          <h2 className="font-bold text-2xl capitalize">Trending Companies</h2>
          <InfiniteScrollCompanies
            initialData={companiesInitData.companies}
            search={search}
          />
        </>
      );
  };

  return (
    <main className="flex flex-col items-start justify-start gap-6 w-full mt-8 mb-2">
      <MaxWidthContainer className="w-full">
        <div className="w-full flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Search</h1>
          <Search searchText={search} searchFor="search" />
        </div>
        <div className="flex flex-col gap-7">{content()}</div>
      </MaxWidthContainer>
    </main>
  );
}
