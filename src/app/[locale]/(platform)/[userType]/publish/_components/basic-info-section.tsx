"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import FormInput from "@/components/ui/form-input";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import SelectFormInput from "@/components/ui/select-form-input";

type BasicInfoSectionProps = {
  t: (key: string) => string;
};

/**
 * BasicInfoSection component that renders form inputs for the basic information of a podcast.
 *
 * @param {BasicInfoSectionProps} props - The properties passed to the component.
 * @returns {JSX.Element} The basic info section component.
 *
 * @example
 * ```tsx
 * <BasicInfoSection t={(key) => key} />
 * ```
 */
const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ t }) => {
  const { control } = useFormContext();

  return (
    <>
      <div className="w-full flex justify-between gap-5">
        {/* Input field for the podcast name */}
        <FormInput
          name="name"
          className="bg-background w-full"
          placeholder={t("podcastNamePlaceholder")}
          label={t("nameLabel")}
          control={control}
        />
        {/* Select input for the podcast type (audio/video) */}
        <SelectFormInput
          name="type"
          placeholder={t("podcastTypePlaceholder")}
          label={t("typeLabel")}
          control={control}
          options={["audio", "video"]}
        />
      </div>
      {/* Textarea input for the podcast summary */}
      <FormInputTextarea
        name="summary"
        label={t("summaryLabel")}
        placeholder={t("summaryPlaceholder")}
        control={control}
      />
    </>
  );
};

export default BasicInfoSection;
