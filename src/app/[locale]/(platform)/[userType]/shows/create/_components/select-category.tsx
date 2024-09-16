"use client";
import SelectPopover from "@/components/select-popver";
import { axiosPublicInstance } from "@/lib/axios.config";
import { CategoryDetails, CategoryResponse } from "@/types/podcast";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  label: string;
  query: UseQueryResult<CategoryDetails[], Error>;
  index: number;
};

const SelectCategory: FC<PropsType> = ({ label, index, query }) => {
  const form = useFormContext();
  const formFieldName = `categories1.${index}`;
  const selectedCategoryWatch = form.watch(formFieldName);

  const categoryQuery = useQuery({
    queryKey: ["categories", { formFieldName, watch: selectedCategoryWatch }],
    queryFn: async () => {
      const { data } = await axiosPublicInstance.get<CategoryResponse>(
        `/api/categories?category_id=${selectedCategoryWatch}`
      );
      return data.categories;
    },
    enabled: !!selectedCategoryWatch,
  });

  useEffect(() => {
    form.setValue(`categories.${index}`, undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryWatch]);

  return (
    <div className="w-full">
      <p>{label}</p>
      <div className="flex justify-center items-start gap-3">
        <SelectPopover
          form={form}
          disabled={query.isError || query.isLoading}
          isError={query.isError}
          isPending={query.isPending}
          formFieldName={formFieldName}
          itemIdKey="id"
          itemNameKey="name"
          items={query.data || []}
          label=""
        />
        <SelectPopover
          form={form}
          formFieldName={`categories.${index}`}
          itemIdKey="id"
          itemNameKey="name"
          items={categoryQuery.data || []}
          isPending={categoryQuery.isPending}
          isError={categoryQuery.isError}
          disabled={
            !selectedCategoryWatch ||
            categoryQuery.isError ||
            categoryQuery.isLoading
          }
          label=""
        />
      </div>
    </div>
  );
};

export default SelectCategory;
