import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import FavoriteCategories from "@/app/[locale]/(platform)/[userType]/favorite/_components/favorite-categories";
import PodcastsAndPodcastersFavoritesTabs from "@/app/[locale]/(platform)/[userType]/favorite/_components/podcasts-and-podcasters-favorites-tabs";

/**
 * Favorites Component
 *
 * This component renders the main favorites page, which includes a list of favorite categories
 * and tabs to switch between favorite podcasts and podcasters. It utilizes the MaxWidthContainer
 * for layout consistency and ensures the content is responsive across different screen sizes.
 *
 * @param {Object} params - URL parameters.
 * @param {string} params.userType - The type of user (e.g., regular, admin).
 * @param {Object} searchParams - Query parameters from the URL.
 * @returns {JSX.Element} The rendered component with the layout and content for favorites.
 */
export default function FavoritesPage({
  params,
  searchParams,
}: {
  params: { userType: string }; // Parameters related to the user type
  searchParams: { [key: string]: string | string[] | undefined }; // Query parameters from the URL
}) {
  return (
    <>
      {/* Main content area */}
      <main className="flex flex-col flex-grow items-center justify-between flex-1 pt-10 lg:pt-24">
        {/* Container to handle maximum width and layout */}
        <MaxWidthContainer className="w-full h-full flex flex-col gap-2 lg:flex-row lg:gap-10">
          {/* Component to render favorite categories list */}
          <FavoriteCategories params={params} searchParams={searchParams} />
          {/* Component to render the tabs for favorite podcasts and podcasters */}
          <PodcastsAndPodcastersFavoritesTabs
            params={params}
            searchParams={searchParams}
          />
        </MaxWidthContainer>
      </main>
    </>
  );
}
