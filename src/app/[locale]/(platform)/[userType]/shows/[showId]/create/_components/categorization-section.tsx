"use client";
import ArrayFormInput from "@/components/ui/array-form-input";
import { axiosPublicInstance } from "@/lib/axios.config";
import { CreateShowSchema } from "@/schema/showsSchema";
import { CategoryResponse } from "@/types/podcast";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import SelectCategory from "./select-category";

const CategorizationSection = () => {
  const form = useFormContext<CreateShowSchema>();
  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosPublicInstance.get<CategoryResponse>(
        `/api/categories`
      );
      return data.categories;
    },
  });
  return (
    <div className="bg-card-secondary border border-border-secondary shadow-[2px_2px_0px_0px_#302e3e] rounded-xl px-12 py-10 space-y-5">
      <h2 className="text-2xl pb-2">04. Categorization</h2>
      <p>
        At least one category is required to create your show. These are used by
        podcast apps, like Apple Podcasts to categorize the show for listeners
        to discover.
      </p>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8">
        <SelectCategory label="1st Category" query={categoryQuery} index={0} />
        <SelectCategory label="2st Category" query={categoryQuery} index={1} />
        <SelectCategory label="3st Category" query={categoryQuery} index={2} />
      </div>
      <ArrayFormInput
        name="tags"
        control={form.control}
        label={"Tags"}
        description="Hit enter or separate tags with commas"
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        defaultValues={form.getValues()}
      />
    </div>
  );
};

export default CategorizationSection;
