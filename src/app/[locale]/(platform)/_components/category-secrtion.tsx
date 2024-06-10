import getCategory from "@/services/podcast/get-category";
import { getTranslations } from "next-intl/server";
import CategoryCard from "./category-card";

const CategorySecrtion = async () => {
  const categories = await getCategory();
  const t = await getTranslations("Index");

  return (
    <div className="w-full space-y-5">
      <h2 className="font-bold text-2xl capitalize">{t("moods")}</h2>
      <div className="w-full flex gap-4 justify-start items-center flex-wrap">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategorySecrtion;
