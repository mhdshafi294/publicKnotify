import getCategory from "@/services/podcast/get-category";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import CategoryCard from "./category-card";

const CategorySecrtion = async () => {
  const categories = await getCategory();
  const t = await getTranslations("Index");

  return (
    <Suspense fallback="loading...">
      <h2 className="font-bold text-2xl">{t("title")}</h2>
      <div className="w-full flex gap-4 justify-start items-center flex-wrap">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </Suspense>
  );
};

export default CategorySecrtion;
