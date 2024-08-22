"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import FormInput from "@/components/ui/form-input";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import SelectFormInput from "@/components/ui/select-form-input";
import FormInputWithPreText from "@/components/ui/form-input-with-pre-text";
import FormCheckbox from "@/components/ui/form-checkbox";
import FormInputRichText from "@/components/ui/form-input-rich-text";

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
          label={t("nameLabel")}
          control={control}
        />
        <FormInputWithPreText
          name="eposide_url"
          className="bg-background w-full"
          placeholder=""
          label={t("eposideUrlLabel")}
          preText=".../episodes/"
          control={control}
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
        />
        {/* Select input for the podcast type (full/bonus/trailer) */}
        <SelectFormInput
          name="episode_type"
          placeholder={t("episodeTypePlaceholder")}
          label={t("episodeTypeLabel")}
          control={control}
          options={["full", "bonus", "trailer"]}
        />
        <FormInput
          name="session"
          type="number"
          className="bg-background w-full"
          placeholder={"1"}
          label={t("sessionLabel")}
          control={control}
        />
        <FormInput
          name="episode_order"
          type="number"
          className="bg-background w-full"
          placeholder={"1"}
          label={t("episodeLabel")}
          control={control}
        />
      </div>
      {/* Textarea input for the podcast summary */}
      <FormInputTextarea
        name="summary"
        label={t("summaryLabel")}
        placeholder={t("summaryPlaceholder")}
        control={control}
      />
      <FormInputRichText
        name="notes"
        label={t("notesLabel")}
        control={control}
      />
      <FormInputRichText
        name="footer"
        label={t("footerLabel")}
        control={control}
      />
    </>
  );
};

export default BasicInfoSection;
