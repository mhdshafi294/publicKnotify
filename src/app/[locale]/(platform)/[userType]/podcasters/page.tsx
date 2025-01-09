import { getServerSession } from "next-auth"; // Core NextAuth import

import { getPodcastersAction } from "@/app/actions/podcasterActions"; // Internal action import
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Internal auth options import
import InfiniteScrollPodcasters from "@/components/infinite-scroll-podcasters"; // Internal infinite scroll component import
import Search from "@/components/search"; // Internal search component import
import MaxWidthContainer from "@/components/ui/MaxWidthContainer"; // Internal UI component import
import { redirect } from "@/navigation"; // Internal navigation import
import { getTranslations } from "next-intl/server"; // Internal i18n import

/**
 * PodcastersPage Component
 *
 * This component renders a page that displays a list of podcasters with a search functionality.
 * It uses server-side data fetching to get the initial list of podcasters and handles redirection
 * based on user type.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.searchParams - Query parameters for the search functionality.
 * @returns {JSX.Element} The rendered component with a list of podcasters and a search bar.
 */
export default async function PodcastersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const session = await getServerSession(authOptions);

  // Redirect if the user is a podcaster
  if (session?.user?.type === "podcaster") {
    redirect(`/podcaster`);
  }

  const t = await getTranslations("Index");

  // Fetch initial data for podcasters
  const firstPageTrendingResponse = await getPodcastersAction({
    type: session?.user?.type!,
    search,
  });

  return (
    <main className="py-10 flex-1">
      <MaxWidthContainer className="flex flex-col gap-7">
        <div className="w-full flex justify-between items-center gap-2">
          <h2 className="lg:text-5xl font-bold">{t("podcasters")}</h2>
          <Search searchText={search} searchFor="podcasters" />
        </div>
        <InfiniteScrollPodcasters
          initialData={firstPageTrendingResponse}
          search={search}
          type={session?.user?.type!}
        />
      </MaxWidthContainer>
    </main>
  );
}
