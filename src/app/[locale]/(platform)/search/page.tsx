// Global imports
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "@/navigation";
import React from "react";

// Local imports
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getSearchAction } from "@/app/actions/podcastActions";
import { getCompaniesAction } from "@/app/actions/companyActions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import InfiniteScrollPodcastsCarousel from "@/components/infinite-scroll-podcasts-carousel";
import InfiniteScrollPodcasterersCarousel from "@/components/infinite-scroll-podcasters-carousel";
import InfiniteScrollPlaylistsCarousel from "@/components/infinite-scroll-playlists-carousel";
import InfiniteScrollCompanies from "@/components/infinite-scroll-companies";
import Search from "@/components/search";
import { SearchResponse } from "@/types/podcast";
import { CompaniesResponse } from "@/types/company";

/**
 * SearchPage Component
 * Handles rendering search results based on user type and search parameters.
 * It fetches relevant data and displays different carousels or components
 * based on whether the user is a podcaster or not.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.params - The route parameters.
 * @param {Object} props.searchParams - The search query parameters.
 * @param {string} props.params.userType - The type of the user (e.g., "podcaster").
 * @param {Object} props.searchParams - The search parameters from the URL.
 *
 * @returns {JSX.Element} The search results page content.
 */
export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Extract search query from searchParams
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  // Fetch the current session using the server session method
  const session = await getServerSession(authOptions);

  // Redirect to login page if not authenticated
  if (!session) {
    redirect("/sign-in");
  }

  // Initialize data variables
  let initData: SearchResponse;
  let companiesInitData: CompaniesResponse;

  // Fetch translations for the "Index" namespace
  const t = await getTranslations("Index");

  // Fetch search or company data based on user type
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

  // Define content based on user type
  const content = () => {
    if (session?.user?.type !== "podcaster") {
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
    } else {
      return (
        <>
          <h2 className="font-bold text-2xl capitalize">
            {t("trendingCompanies")}
          </h2>
          <InfiniteScrollCompanies
            initialData={companiesInitData.companies}
            search={search}
          />
        </>
      );
    }
  };

  return (
    <main className="flex flex-1 flex-col items-start justify-start gap-6 w-full mt-8 mb-2">
      <MaxWidthContainer className="w-full">
        <div className="w-full flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">{t("search")}</h1>
          <Search searchText={search} searchFor="search" />
        </div>
        <div className="flex flex-col gap-7">{content()}</div>
      </MaxWidthContainer>
    </main>
  );
}
