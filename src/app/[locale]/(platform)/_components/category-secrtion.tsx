import getCategories from "@/services/podcast/get-categories";
import { getTranslations } from "next-intl/server";
import CategoryCard from "./category-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { useLocale } from "next-intl";
import { getDirection } from "@/lib/utils";

const CategorySecrtion = async () => {
  const categories = await getCategories();
  const t = await getTranslations("Index");
  const locale = useLocale();
  const direction = getDirection(locale);

  return (
    <MaxWidthContainer className="w-full px-0 ps-4">
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          direction,
        }}
        className="w-full"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl capitalize">{t("moods")}</h2>
          {/* <div className="flex relative justify-end items-center end-[80px]">
          <CarouselPrevious />
          <CarouselNext />
        </div> */}
        </div>
        <CarouselContent className="w-full mt-5">
          {categories.map((category) => (
            <CarouselItem key={category.id} className="basis-auto">
              <CategoryCard key={category.id} category={category} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </MaxWidthContainer>
  );
};

export default CategorySecrtion;
