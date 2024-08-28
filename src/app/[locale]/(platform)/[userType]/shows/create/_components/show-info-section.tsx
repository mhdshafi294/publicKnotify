"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import FormInput from "@/components/ui/form-input";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import { CreateShowSchema } from "@/schema/showsSchema";

/**
 * The ShowInfoSection component renders a form section for inputting the basic information
 * about a show, including the title and description.
 *
 * @returns {JSX.Element} The rendered ShowInfoSection component.
 */
const ShowInfoSection: React.FC = () => {
  const form = useFormContext<CreateShowSchema>();
  const t = useTranslations("Index");

  return (
    <div className="bg-card-secondary border border-border-secondary shadow-[2px_2px_0px_0px_#302e3e] rounded-xl px-12 py-10 space-y-5">
      <h2 className="text-2xl pb-2">{t("show-info")}</h2>
      <FormInput
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        control={form.control}
        name="name"
        labelClassName="text-base"
        label={t("title")}
      />
      <FormInputTextarea
        className="bg-foreground/10 resize-y border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        control={form.control}
        labelClassName="text-base"
        name="description"
        label={t("description")}
      />
    </div>
  );
};

export default ShowInfoSection;
