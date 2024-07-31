import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Category } from "@/types/podcast";

const ProfileCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <ScrollArea className="w-fit max-w-full mx-auto mt-2">
      <div className="w-fit flex items-center gap-5">
        {categories?.map((category, index) => {
          if (index === categories.length - 1) {
            return (
              <div
                key={category.id}
                className="text-center flex items-center gap-5  text-sm"
              >
                <p className="opacity-75 capitalize">{category.name}</p>
              </div>
            );
          } else {
            return (
              <div
                key={category.id}
                className="text-center flex items-center gap-5  text-sm"
              >
                <p className="opacity-75 capitalize">{category.name}</p>
                <p className="text-lg">|</p>
              </div>
            );
          }
        })}
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  );
};

export default ProfileCategories;
