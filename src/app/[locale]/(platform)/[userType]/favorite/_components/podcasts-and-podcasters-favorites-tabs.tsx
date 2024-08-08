import React from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import CustomTabsTrigger from "./CustomTabsTrigger";
import FavoritePodcastsTapPage from "./favorite-podcasts-tap-page";
import FavoritePodcastersTapPage from "./favorite-podcasters-tap-page";
import { PodcastIcon, UsersIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getDirection } from "@/lib/utils";

const PodcastsAndPodcastersFavoritesTabs = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
}) => {
  const t = useTranslations("Index");
  const tab = searchParams?.tab ? (searchParams.tab as string) : "podcasts";
  const favoriteCategory = searchParams?.favoriteCategory as string | undefined;

  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <Tabs defaultValue={tab} className="w-full lg:w-9/12" dir={dir}>
      <TabsList className="w-fit h-14 grid grid-cols-2 bg-transparent text-white rounded-md mb-6 px-0 border-none border-transparent data-[state=active]:md:bg-greeny data-[state=active]:md:text-black data-[state=active]:font-bold">
        <CustomTabsTrigger
          className="data-[state=active]:md:text-xl data-[state=active]:md:text-greeny data-[state=active]:font-bold data-[state=active]:before:absolute data-[state=active]:before:h-0.5 data-[state=active]:before:w-7 data-[state=active]:before:bg-greeny data-[state=active]:before:translate-y-4 data-[state=active]:before:rounded-full hover:no-underline hover:before:absolute hover:before:h-0.5 hover:before:w-7 hover:before:bg-primary hover:before:translate-y-4 hover:before:rounded-full"
          value="podcasts"
        >
          <div className="flex items-center gap-2">
            <PodcastIcon size={18} />
            {t("podcasts")}
          </div>
        </CustomTabsTrigger>
        <CustomTabsTrigger
          className="data-[state=active]:md:text-xl data-[state=active]:md:text-greeny data-[state=active]:font-bold data-[state=active]:before:absolute data-[state=active]:before:h-0.5 data-[state=active]:before:w-7 data-[state=active]:before:bg-greeny data-[state=active]:before:translate-y-4 data-[state=active]:before:rounded-full hover:no-underline hover:before:absolute hover:before:h-0.5 hover:before:w-7 hover:before:bg-primary hover:before:translate-y-4 hover:before:rounded-full"
          value="podcasters"
        >
          <div className="flex items-center gap-2">
            <UsersIcon size={18} />
            {t("podcasters")}
          </div>
        </CustomTabsTrigger>
      </TabsList>
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
