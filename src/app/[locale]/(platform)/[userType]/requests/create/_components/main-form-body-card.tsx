"use client";

import { getCategoriesAction } from "@/app/actions/podcastActions";
import SelectPodcaster from "@/components/select-podcaster";
import ArrayFormInput from "@/components/ui/array-form-input";
import ArraySelectManyFormInput from "@/components/ui/array-select-many-form-input";
import { Card, CardContent } from "@/components/ui/card";
import DatePicker from "@/components/ui/date-picker";
import DurationPickerFormInput from "@/components/ui/duration-picker-form-input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormCheckbox from "@/components/ui/form-checkbox";
import FormInput from "@/components/ui/form-input";
import FormFileInput from "@/components/ui/form-input-file";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import TimePicker from "@/components/ui/time-picker";
import { getDirection } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { useFormContext } from "react-hook-form";

/**
 * Represents the main body card component of a form.
 * This component renders a card with form content inside it.
 * @returns JSX element representing the main body card of the form.
 */
const MainFormBodyCard = () => {
  const form = useFormContext();
  const t = useTranslations("Index");
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <Card className="bg-card/50 border-card-foreground/10 w-full h-[calc(100vh-184px)]  px-2 lg:px-7 py-10 pb-2">
      <ScrollArea className="h-full" dir={dir}>
        <CardContent className="flex flex-col gap-7">
          <div className="w-full flex justify-between items-start gap-5">
            <FormInput
              name="name"
              className="bg-background w-full"
              placeholder={t("podcastNamePlaceholder")}
              label={t("name")}
              control={form.control}
            />
            <FormField
              control={form.control}
              name="podcaster_id"
              render={({ field }) => (
                <FormItem className="w-full" dir={dir}>
                  <FormLabel className="text-lg capitalize">
                    {t("podcaster")}
                  </FormLabel>
                  <SelectPodcaster
                    setValue={field.onChange}
                    value={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormInputTextarea
            name="summary"
            label={t("podcastSummary")}
            placeholder={t("podcastSummaryPlaceholder")}
            control={form.control}
          />
          <div className="w-full flex justify-between items-start gap-5">
            <FormFileInput
              name="thumbnail"
              label={t("thumbnail")}
              control={form.control}
              className="w-full"
            />
            <FormFileInput
              name="background"
              label={t("background")}
              control={form.control}
              className="w-full"
            />
          </div>
          <div className="w-full flex justify-between gap-5 items-start flex-wrap">
            <div>
              <FormInput
                name="company_tag"
                className="bg-background"
                placeholder={t("company")}
                label={t("companyTag")}
                control={form.control}
              />
            </div>
            <DatePicker
              name="publishing_date"
              label={t("date")}
              control={form.control}
            />
            <TimePicker
              name="publishing_time"
              label={t("time")}
              control={form.control}
            />
            <DurationPickerFormInput
              name="ad_period"
              className="bg-background"
              label={t("period")}
              control={form.control}
            />
          </div>
          <ArraySelectManyFormInput
            name="categories"
            control={form.control}
            label={t("categories")}
            className="w-full bg-background"
            action={getCategoriesAction}
            defaultValues={form.getValues()}
          />
          <ArrayFormInput
            name="hashtags"
            control={form.control}
            label={t("hashtags")}
            className="w-full bg-background"
            defaultValues={form.getValues()}
          />
          <FormCheckbox
            name="terms"
            control={form.control}
            className="mt-0"
            checkboxClassName="size-4 rounded-full"
            label={t("acceptTerms")}
          />
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default MainFormBodyCard;
