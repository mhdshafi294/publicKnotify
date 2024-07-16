import { useTranslations } from "next-intl";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import FavoriteCategories from "@/app/[locale]/(platform)/[userType]/favorite/_components/favorite-categories";
import PodcastsAndPodcastersFavoritesTabs from "@/app/[locale]/(platform)/[userType]/favorite/_components/podcasts-and-podcasters-favorites-tabs";

export default function Favorites({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const t = useTranslations("Index");

  return (
    <>
      <main className="flex flex-col flex-grow items-center justify-between pt-10 lg:pt-24">
        <MaxWidthContainer className="w-full h-full flex flex-col gap-2 lg:flex-row lg:gap-10">
          <FavoriteCategories params={params} searchParams={searchParams} />
          <PodcastsAndPodcastersFavoritesTabs
            params={params}
            searchParams={searchParams}
          />
        </MaxWidthContainer>
      </main>
    </>
  );
}
