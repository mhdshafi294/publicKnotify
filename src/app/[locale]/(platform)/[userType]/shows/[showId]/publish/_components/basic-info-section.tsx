"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import FormCheckbox from "@/components/ui/form-checkbox";
import FormInput from "@/components/ui/form-input";
import FormInputRichText from "@/components/ui/form-input-rich-text";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import FormInputWithPreText from "@/components/ui/form-input-with-pre-text";
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
  const { control, watch } = useFormContext();

  return (
    <>
      <div className="w-full flex justify-between gap-5">
        {/* Input field for the podcast name */}
        <FormInput
          name="name"
          className="bg-background w-full"
          placeholder={t("podcastNamePlaceholder")}
          label={t("titleLabel")}
          info={t("podcastNameInfo")}
          control={control}
        />
        <FormInputWithPreText
          name="episode_url"
          className="bg-background w-full"
          placeholder=""
          label={t("eposideUrlLabel")}
          preText=".../episodes/"
          control={control}
          info={t("episodeUrlInfo")}
        />
      </div>
      <FormCheckbox
        name="explicit_language"
        control={control}
        className="mt-0"
        checkboxClassName="size-4 rounded-full"
        label={t("explicitLanguageLabel")}
      />
      <div className="w-full flex justify-between gap-5">
        {/* Select input for the podcast media type (audio/video) */}
        <SelectFormInput
          name="type"
          placeholder={t("podcastMediaTypePlaceholder")}
          label={t("mediaTypeLabel")}
          control={control}
          options={["audio", "video"]}
          info={t("mediaTypeInfo")}
        />
        {/* Select input for the podcast type (full/bonus/trailer) */}
        <SelectFormInput
          name="episode_type"
          placeholder={t("episodeTypePlaceholder")}
          label={t("episodeTypeLabel")}
          control={control}
          options={["full", "bonus", "trailer"]}
          info={t("episodeTypeInfo")}
        />
        <FormInput
          name="season"
          type="number"
          className="bg-background w-full"
          placeholder={"1"}
          label={t("sessionLabel")}
          control={control}
          info={t("seasonInfo")}
        />
        <FormInput
          name="episode_order"
          type="number"
          className="bg-background w-full"
          placeholder={"1"}
          label={t("episodeLabel")}
          control={control}
          info={t("episodeInfo")}
        />
      </div>
      {/* Textarea input for the podcast summary */}
      <FormInputTextarea
        name="summary"
        label={t("summaryLabel")}
        placeholder={t("summaryPlaceholder")}
        control={control}
        info={t("summaryInfo")}
      />
      <FormInputRichText
        name="notes"
        label={t("notesLabel")}
        control={control}
        info={t("notesInfo")}
      />
      <FormInputRichText
        name="footer"
        label={t("footerLabel")}
        control={control}
        info={t("footerInfo")}
      />
    </>
  );
};

export default BasicInfoSection;
