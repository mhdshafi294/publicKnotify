import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Category } from "@/types/podcast";

/**
 * Component to display a list of categories in a horizontally scrollable area.
 *
 * @param {object} props - Component props.
 * @param {Category[]} props.categories - Array of categories to display.
 * @returns {JSX.Element} The rendered component.
 */
const ProfileCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <ScrollArea className="w-fit max-w-full mx-auto mt-2">
      <div className="w-fit flex items-center gap-5">
        {/* Map through categories and display each category */}
        {categories?.map((category, index) => (
          <Badge
            key={category.id}
            variant={"secondary"}
            className="bg-[#4285F40A]"
          >
            {category.name}
          </Badge>
          // <div
          //   key={category.id}
          //   className="text-center flex items-center gap-5 text-sm"
          // >
          //   {/* Display category name */}
          //   <p className="opacity-75 capitalize">{category.name}</p>
          // </div>
        ))}
      </div>
      {/* Horizontal scrollbar, hidden by default */}
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  );
};

export default ProfileCategories;
