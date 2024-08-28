"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import ArrayFormInput from "@/components/ui/array-form-input";
import { axiosPublicInstance } from "@/lib/axios.config";
import { CreateShowSchema } from "@/schema/showsSchema";
import { CategoryResponse } from "@/types/podcast";
import SelectCategory from "./select-category";

/**
 * The CategorizationSection component allows users to select categories and tags for their show.
 * It fetches available categories from the API and displays category selection inputs.
 * The form handles errors related to category selection and displays them if any.
 *
 * @returns {JSX.Element} The rendered CategorizationSection component.
 */
const CategorizationSection: React.FC = () => {
  const form = useFormContext<CreateShowSchema>();
  const t = useTranslations("Index");

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
      <h2 className="text-2xl pb-2">{t("createShowCategoryTitle")}</h2>
      <p>{t("categoryDescription")}</p>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8">
        <SelectCategory
          label={t("firstCategory")}
          query={categoryQuery}
          index={0}
        />
        <SelectCategory
          label={t("secondCategory")}
          query={categoryQuery}
          index={1}
        />
        <SelectCategory
          label={t("thirdCategory")}
          query={categoryQuery}
          index={2}
        />
        {form.formState.errors.categories?.message && (
          <p className="text-red-500">
            {t(form.formState.errors.categories.message)}
          </p>
        )}
        {form.formState.errors.categories?.root?.message && (
          <p className="text-red-500">
            {t(form.formState.errors.categories.root.message)}
          </p>
        )}
      </div>
      <ArrayFormInput
        name="tags"
        control={form.control}
        label={t("tagsLabel")}
        description={t("tagsDescription")}
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        defaultValues={form.getValues()}
      />
    </div>
  );
};

export default CategorizationSection;
