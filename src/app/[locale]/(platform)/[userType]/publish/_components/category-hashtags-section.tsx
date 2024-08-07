"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import ArraySelectManyFormInput from "@/components/ui/array-select-many-form-input";
import ArrayFormInput from "@/components/ui/array-form-input";
import { getCategoriesAction } from "@/app/actions/podcastActions";

type CategoryHashtagsSectionProps = {
  t: (key: string) => string;
};

/**
 * CategoryHashtagsSection component for selecting categories and hashtags.
 *
 * @param {CategoryHashtagsSectionProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered CategoryHashtagsSection component.
 *
 * @example
 * ```tsx
 * <CategoryHashtagsSection t={translateFunction} />
 * ```
 */
const CategoryHashtagsSection: React.FC<CategoryHashtagsSectionProps> = ({
  t,
}) => {
  const { control, getValues } = useFormContext();

  return (
    <>
      <div className="w-full flex justify-between gap-5">
        <ArraySelectManyFormInput
          name="categories"
          control={control}
          label={t("categoriesLabel")}
          className="w-full bg-background"
          action={getCategoriesAction}
          defaultValues={getValues()}
        />
      </div>
      <ArrayFormInput
        name="hashtags"
        control={control}
        label={t("hashtagsLabel")}
        className="w-full bg-background"
        defaultValues={getValues()}
      />
    </>
  );
};

export default CategoryHashtagsSection;
