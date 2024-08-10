import { getServerSession } from "next-auth";
import { useLocale } from "next-intl";
import { HeartIcon } from "lucide-react";

import { getMyFavoriteCategoriesListAction } from "@/app/actions/podcastActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import FavoriteCategoriesUL from "./favorite-categories-ul";
import { getDirection } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

/**
 * FavoriteCategories Component
 *
 * This component fetches and displays the user's favorite podcast categories. It includes
 * both a scrollable area for smaller screens and a static sidebar for larger screens.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.params - Route parameters including the user type.
 * @param {Object} props.searchParams - Query parameters from the URL.
 * @returns {JSX.Element} The rendered component with favorite categories.
 */
const FavoriteCategories = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
}) => {
  // Retrieve the user session
  const session = await getServerSession(authOptions);

  // Fetch the user's favorite categories
  const favoriteCategoriesData = await getMyFavoriteCategoriesListAction({
    type: session?.user?.type!,
  });

  // Extract the favorite category from search parameters
  const favoriteCategory = searchParams?.favoriteCategory as string | undefined;

  // Fetch translations for the current locale
  const t = await getTranslations("Index");

  // Determine the text direction based on the locale
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <>
      {/* Scrollable category list for smaller screens */}
      <div className="block lg:hidden mb-5">
        <ScrollArea dir={dir}>
          <FavoriteCategoriesUL
            {...{ searchParams, favoriteCategory, favoriteCategoriesData }}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Static sidebar for larger screens */}
      <div className="hidden lg:block w-2/12 h-full rounded-lg bg-card py-10 px-5">
        <div className="flex flex-col gap-2 items-center">
          <HeartIcon className="" />
          <h2 className="text-xl opacity-75 text-center ">
            {t("yourFavoriteCategories")}
          </h2>
        </div>
        <FavoriteCategoriesUL
          {...{ searchParams, favoriteCategory, favoriteCategoriesData }}
        />
      </div>
    </>
  );
};

export default FavoriteCategories;
