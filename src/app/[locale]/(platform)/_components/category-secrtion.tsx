import getCategory from "@/services/podcast/get-category";
import { Suspense } from "react";

const CategorySecrtion = async () => {
  const categories = await getCategory();

  return (
    <Suspense fallback="loading...">
          <h2 className="font-bold text-2xl">Moods</h2>
      <div className="w-full flex gap-4 justify-start items-center flex-wrap">
        {categories.map((category) => (
          <div className="bg-secondary rounded-lg w-48 p-6" key={category.id}>
            <p className="text-xl font-bold capitalize">{category.name}</p>
          </div>
        ))}
      </div>
    </Suspense>
  );
};

export default CategorySecrtion;
