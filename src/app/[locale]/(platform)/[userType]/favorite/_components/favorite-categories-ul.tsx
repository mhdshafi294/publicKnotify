import { cn, getDirection } from "@/lib/utils";
import { Link } from "@/navigation";
import { CategoryDetails } from "@/types/podcast";
import { useLocale, useTranslations } from "next-intl";

const FavoriteCategoriesUL = ({
  searchParams,
  favoriteCategory,
  favoriteCategoriesData,
}: {
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
  favoriteCategory?: string;
  favoriteCategoriesData: CategoryDetails[];
}) => {
  const t = useTranslations("Index");
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <ul className="pb-5 lg:py-0 lg:mt-10 flex lg:flex-col lg:gap-5 gap-5 lg:ms-10 text-lg">
      <li className="relative">
        <Link
          href={{
            pathname: "favorite",
            query: { ...searchParams, favoriteCategory: "" },
          }}
          className={cn(
            "capitalize text-white p-0 hover:before:absolute lg:hover:before:h-1 lg:hover:before:w-2 hover:before:bg-primary lg:hover:before:-translate-x-5 lg:hover:before:translate-y-3 hover:before:rounded-full font-bold relative",
            {
              "before:absolute before:size-[6px] before:bg-greeny hover:before:bg-greeny before:translate-y-7 before:start-1/2 before:lg:start-0  before:-translate-x-1/2 before:rounded-full lg:before:absolute lg:before:size-2 lg:before:bg-greeny hover:lg:before:bg-greeny lg:before:-translate-x-5 lg:before:rounded-full lg:before:translate-y-2.5 text-greeny":
                typeof favoriteCategory !== "string" || favoriteCategory === "",
            },
            {
              "lg:hover:before:translate-x-5 ": dir === "rtl",
            },
            {
              "before:translate-x-1/2 lg:before:translate-x-5":
                dir === "rtl" &&
                (typeof favoriteCategory !== "string" ||
                  favoriteCategory === ""),
            }
          )}
        >
          {t("all")}
        </Link>
      </li>
      {favoriteCategoriesData.map((category) => (
        <li key={category.id} className="relative">
          <Link
            href={{
              pathname: "favorite",
              query: { ...searchParams, favoriteCategory: category.id },
            }}
            className={cn(
              "capitalize text-white p-0 hover:before:absolute lg:hover:before:h-1 lg:hover:before:w-2 hover:before:bg-primary lg:hover:before:-translate-x-5 lg:hover:before:translate-y-3 hover:before:rounded-full font-bold relative",
              {
                "before:absolute before:size-[6px] before:bg-greeny hover:before:bg-greeny before:translate-y-7 before:start-1/2 before:lg:start-0 before:-translate-x-1/2 before:rounded-full lg:before:absolute lg:before:size-2 lg:before:bg-greeny hover:lg:before:bg-greeny lg:before:-translate-x-5 lg:before:rounded-full lg:before:translate-y-2.5 text-greeny":
                  typeof favoriteCategory === "string" &&
                  favoriteCategory === category.id.toString(),
              },
              {
                "lg:hover:before:translate-x-5 ": dir === "rtl",
              },
              {
                "before:translate-x-1/2 lg:before:translate-x-5":
                  dir === "rtl" &&
                  (typeof favoriteCategory !== "string" ||
                    favoriteCategory === ""),
              }
            )}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FavoriteCategoriesUL;
