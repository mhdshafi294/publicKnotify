"use client";

import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SelectRequest from "@/components/select-request";
import PricePickerFormInput from "@/components/ui/price-picker-form-input";
import SelectFormInput from "@/components/ui/select-form-input";
import DurationPickerFormInput from "@/components/ui/duration-picker-form-input";
import DatePicker from "@/components/ui/date-picker";
import TimePicker from "@/components/ui/time-picker";
import FormInputRichText from "@/components/ui/form-input-rich-text";
import { ContractSchema } from "@/schema/contractSchema";
import { useTranslations } from "next-intl";

interface FormFieldsProps {
  form: {
    control: Control<ContractSchema>;
  };
  contract_id?: string;
  dir: string;
}

const FormFields: React.FC<FormFieldsProps> = ({ form, contract_id, dir }) => {
  const t = useTranslations("Index");

  return (
    <div className="space-y-3">
      <div className="w-full flex justify-between gap-5 flex-col md:flex-row">
        <FormField
          control={form.control}
          disabled={!!contract_id}
          name="company_request_id"
          render={({ field }) => (
            <FormItem className="w-full" dir={dir}>
              <FormLabel className="text-lg capitalize">
                {t("podcaster")}
              </FormLabel>
              <SelectRequest
                setValue={field.onChange}
                value={field.value ? field.value : ""}
                disabled={!!contract_id}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <PricePickerFormInput
          name="ad_cost"
          className="bg-background"
          FormItemClassName="w-full"
          label={t("cost")}
          control={form.control}
        />
      </div>

      <div className="w-full flex justify-between gap-5 flex-col md:flex-row">
        <SelectFormInput
          name="media_type"
          placeholder={t("podcastMediaTypePlaceholder")}
          label={t("mediaTypeLabel")}
          control={form.control}
          options={["audio", "video"]}
        />
        <SelectFormInput
          name="episode_type"
          placeholder={t("episodeTypePlaceholder")}
          label={t("episodeTypeLabel")}
          control={form.control}
          options={["Full", "Bonus", "Trailer"]}
        />
      </div>
      <div className="w-full flex justify-between gap-5 flex-col md:flex-row">
        <SelectFormInput
          name="ad_place"
          placeholder={t("episodeTypePlaceholder")}
          label={t("episodeTypeLabel")}
          control={form.control}
          options={["first", "middle", "end", "video"]}
        />
        <DurationPickerFormInput
          name="ad_period"
          className="bg-background"
          FormItemClassName="w-full"
          label={t("period")}
          control={form.control}
        />
      </div>
      <div className="w-full flex justify-between gap-5 items-start flex-wrap">
        <DatePicker
          className="flex-1"
          name="publishing_date"
          label={t("dateLabel")}
          control={form.control}
        />
        <TimePicker
          className="flex-1"
          name="publishing_time"
          label={t("timeLabel")}
          control={form.control}
        />
      </div>
      <FormInputRichText
        name="description"
        label={t("description")}
        control={form.control}
      />
    </div>
  );
};

export default FormFields;
