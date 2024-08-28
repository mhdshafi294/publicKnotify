// External Imports
import React from "react";
import { PodcastIcon, UsersIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

// Internal Imports
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import CustomTabsTrigger from "./Custom-tabs-trigger";
import FavoritePodcastsTapPage from "./favorite-podcasts-tap-page";
import FavoritePodcastersTapPage from "./favorite-podcasters-tap-page";
import { getDirection } from "@/lib/utils";

/**
 * PodcastsAndPodcastersFavoritesTabs Component
 * Renders a tabbed interface for viewing favorite podcasts and podcasters.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.userType - The type of user.
 * @param {Object} props.searchParams - The query string parameters.
 * @param {string} [props.searchParams.tab] - The active tab ("podcasts" or "podcasters").
 * @param {string} [props.searchParams.favoriteCategory] - The favorite category ID.
 *
 * @returns {JSX.Element} The rendered tabs component.
 */
const PodcastsAndPodcastersFavoritesTabs = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
}) => {
  const t = useTranslations("Index");

  // Determine the active tab and favorite category from the search parameters
  const tab = searchParams?.tab ? (searchParams.tab as string) : "podcasts";
  const favoriteCategory = searchParams?.favoriteCategory as string | undefined;

  // Get the current locale and text direction
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <Tabs defaultValue={tab} className="w-full lg:w-9/12" dir={dir}>
      {/* Tabs List */}
      <TabsList className="w-fit h-14 grid grid-cols-2 bg-transparent text-white rounded-md mb-6 px-0 border-none border-transparent data-[state=active]:md:bg-greeny data-[state=active]:md:text-black font-bold">
        {/* Podcasts Tab Trigger */}
        <CustomTabsTrigger
          className="data-[state=active]:md:text-xl data-[state=active]:md:text-greeny font-bold data-[state=active]:before:absolute data-[state=active]:before:h-0.5 data-[state=active]:before:w-7 data-[state=active]:before:bg-greeny data-[state=active]:before:translate-y-4 data-[state=active]:before:rounded-full hover:no-underline hover:before:absolute hover:before:h-0.5 hover:before:w-7 hover:before:bg-primary hover:before:translate-y-4 hover:before:rounded-full"
          value="podcasts"
        >
          <div className="flex items-center gap-2">
            <PodcastIcon size={18} />
            {t("podcasts")}
          </div>
        </CustomTabsTrigger>

        {/* Podcasters Tab Trigger */}
        <CustomTabsTrigger
          className="data-[state=active]:md:text-xl data-[state=active]:md:text-greeny font-bold data-[state=active]:before:absolute data-[state=active]:before:h-0.5 data-[state=active]:before:w-7 data-[state=active]:before:bg-greeny data-[state=active]:before:translate-y-4 data-[state=active]:before:rounded-full hover:no-underline hover:before:absolute hover:before:h-0.5 hover:before:w-7 hover:before:bg-primary hover:before:translate-y-4 hover:before:rounded-full"
          value="podcasters"
        >
          <div className="flex items-center gap-2">
            <UsersIcon size={18} />
            {t("podcasters")}
          </div>
        </CustomTabsTrigger>
      </TabsList>

      {/* Tabs Content */}
      <TabsContent value="podcasts">
        <FavoritePodcastsTapPage
          tab={tab}
          favoriteCategoryId={favoriteCategory}
        />
      </TabsContent>
      <TabsContent value="podcasters">
        <FavoritePodcastersTapPage
          tab={tab}
          favoriteCategoryId={favoriteCategory}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PodcastsAndPodcastersFavoritesTabs;
