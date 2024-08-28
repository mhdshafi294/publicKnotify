"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreateShowSchema } from "@/schema/showsSchema";

/**
 * The FormatSection component allows users to select the format of their show,
 * including options for episodic, episodic with seasons, and serial formats.
 * It displays a description based on the selected format.
 *
 * @returns {JSX.Element} The rendered FormatSection component.
 */
const FormatSection: React.FC = () => {
  const form = useFormContext<CreateShowSchema>();
  const t = useTranslations("Index");

  const typeDescription =
    form.watch("type") === "1"
      ? t("episodicDescription")
      : form.watch("type") === "2"
      ? t("episodicSeasonsDescription")
      : t("serialDescription");

  return (
    <div className="bg-card-secondary border border-border-secondary shadow-[2px_2px_0px_0px_#302e3e] rounded-xl px-12 py-10 space-y-5">
      <h2 className="text-2xl pb-2">{t("formatTitle")}</h2>
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-xl font-medium">
              {t("showTypeLabel")}
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="1" />
                  </FormControl>
                  <FormLabel className="font-normal text-base">
                    {t("episodic")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="2" />
                  </FormControl>
                  <FormLabel className="font-normal text-base">
                    {t("episodicSeasons")}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="3" />
                  </FormControl>
                  <FormLabel className="font-normal text-base">
                    {t("serial")}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormDescription className="text-base text-foreground/50">
              {typeDescription}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormatSection;
