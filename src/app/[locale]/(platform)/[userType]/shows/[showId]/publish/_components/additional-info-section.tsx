"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import DatePicker from "@/components/ui/date-picker";
import TimePicker from "@/components/ui/time-picker";
import SelectPlayList from "@/app/[locale]/(platform)/[userType]/shows/[showId]/publish/_components/select-play-list";
import { useLocale } from "next-intl";
import { getDirection } from "@/lib/utils";

type AdditionalInfoSectionProps = {
  addToPlayList: boolean;
  setAddToPlayList: React.Dispatch<React.SetStateAction<boolean>>;
  t: (key: string) => string;
};

/**
 * AdditionalInfoSection component that renders additional podcast information fields.
 *
 * @param {AdditionalInfoSectionProps} props - The properties passed to the component.
 * @returns {JSX.Element} The additional info section component.
 *
 * @example
 * ```tsx
 * <AdditionalInfoSection addToPlayList={addToPlayList} setAddToPlayList={setAddToPlayList} t={t} />
 * ```
 */
const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  addToPlayList,
  setAddToPlayList,
  t,
}) => {
  const { control } = useFormContext();
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <>
      <div className="w-full flex justify-between gap-5 items-start flex-wrap">
        {/* <div className="w-[29%]">
          <FormInput
            name="company_tag"
            className="bg-background"
            placeholder={t("companyTagPlaceholder")}
            label={t("companyTagLabel")}
            control={control}
          />
        </div> */}
        <DatePicker
          className="w-[29%]"
          name="publishing_date"
          label={t("dateLabel")}
          control={control}
        />
        <TimePicker
          className="w-[29%]"
          name="publishing_time"
          label={t("timeLabel")}
          control={control}
        />
      </div>
      {/* <div className="w-full space-y-3">
        <div className="flex items-center gap-3" dir={dir}>
          <Checkbox
            checked={addToPlayList}
            onCheckedChange={() => setAddToPlayList(!addToPlayList)}
            id="add_to_playlist"
            className="size-6 rounded-full"
          />
          <label
            htmlFor="add_to_playlist"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("addToPlayListLabel")}
          </label>
        </div>
        {addToPlayList ? (
          <FormField
            control={control}
            name="play_list_id"
            render={({ field }) => (
              <FormItem className="w-full" dir={dir}>
                <FormLabel className="text-lg capitalize">
                  {t("playlistLabel")}
                </FormLabel>
                <SelectPlayList setValue={field.onChange} value={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}
      </div> */}
    </>
  );
};

export default AdditionalInfoSection;
