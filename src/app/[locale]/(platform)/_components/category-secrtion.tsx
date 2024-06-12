import getCategory from "@/services/podcast/get-category";
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

const CategorySecrtion = async () => {
  const categories = await getCategory();
  const t = await getTranslations("Index");

  return (
    <MaxWidthContainer className="w-full px-0 ps-4">
      <Carousel
        opts={{ align: "start", containScroll: false, dragFree: true }}
        className="w-full"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl capitalize">{t("moods")}</h2>
          {/* <div className="flex relative justify-end items-center end-[80px]">
          <CarouselPrevious />
          <CarouselNext />
        </div> */}
        </div>
        <CarouselContent className="w-full mt-5 -ml-4">
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="basis-auto md:basis-1/4 lg:basis-[14%]"
            >
              <CategoryCard key={category.id} category={category} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </MaxWidthContainer>
  );
};

export default CategorySecrtion;
