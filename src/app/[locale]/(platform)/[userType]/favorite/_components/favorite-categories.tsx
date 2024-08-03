import { getMyFavoriteCategoriesListAction } from "@/app/actions/podcastActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CategoryDetails } from "@/types/podcast";
import { getServerSession } from "next-auth";
import Link from "next/link";
import FavoriteCategoriesUL from "./favorite-categories-ul";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { HeartIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

const FavoriteCategories = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
}) => {
  const session = await getServerSession(authOptions);

  const favoriteCategoriesData = await getMyFavoriteCategoriesListAction({
    type: session?.user?.type!,
  });

  const favoriteCategory = searchParams?.favoriteCategory as string | undefined;
  const t = await getTranslations("Index");

  return (
    <>
      <div className="block lg:hidden mb-5">
        <ScrollArea>
          <FavoriteCategoriesUL
            {...{ searchParams, favoriteCategory, favoriteCategoriesData }}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
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
