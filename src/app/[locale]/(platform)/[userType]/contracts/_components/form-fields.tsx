"use client";

import { getAdvertisingTypesAction } from "@/app/actions/requestsActions";
import SelectRequest from "@/components/select-request";
import DatePicker from "@/components/ui/date-picker";
import DurationPickerFormInput from "@/components/ui/duration-picker-form-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInputRichText from "@/components/ui/form-input-rich-text";
import PricePickerFormInput from "@/components/ui/price-picker-form-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectFormInput from "@/components/ui/select-form-input";
import TimePicker from "@/components/ui/time-picker";
import { cn } from "@/lib/utils";
import { ContractSchema } from "@/schema/contractSchema";
import { Separator } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { Control } from "react-hook-form";

interface FormFieldsProps {
  form: {
    control: Control<ContractSchema>;
    watch: (name: keyof ContractSchema) => any;
  };
  contract_id?: string;
  dir: string;
}

/**
 * Functional component that represents a form with multiple form fields.
 * @param {FormFieldsProps} form - The form object containing form control and data.
 * @param {string} contract_id - The ID of the contract associated with the form.
 * @param {string} dir - The direction of the form fields.
 * @returns JSX element representing the form with form fields.
 */
const FormFields: React.FC<FormFieldsProps> = ({ form, contract_id, dir }) => {
  const t = useTranslations("Index");
  const { data: session, status } = useSession();
  const lang = useLocale();

  // Fetch contract data to edit
  const { data: ads_types } = useQuery({
    queryKey: ["ads_types"],
    queryFn: () =>
      getAdvertisingTypesAction({
        type: session?.user?.type!,
      }),
  });

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
          placeholder={t("podcast-media-format")}
          label={"Podcast Format"}
          control={form.control}
          options={["audio", "video"]}
        />
        <FormField
          control={form.control}
          name="advertising_type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Advertising Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("select-the-type-of-your-ad")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ads_types?.types?.map((ad_type, index) => (
                    <>
                      {index !== 0 && (
                        <Separator className="bg-border-secondary" />
                      )}
                      <SelectItem
                        key={ad_type?.id}
                        value={ad_type.name[lang as "en" | "ar"]}
                        className="capitalize cursor-pointer"
                      >
                        <div className="capitalize flex justify-center items-center gap-2">
                          {ad_type.name[lang as "en" | "ar"]}
                        </div>
                      </SelectItem>
                    </>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full flex justify-between gap-5 flex-col md:flex-row">
        <FormField
          control={form.control}
          name="advertising_section_id"
          render={({ field }) => (
            <FormItem className="space-y-3 w-full">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 lg:grid-cols-3 items-center  gap-3 w-full"
                >
                  {ads_types?.types
                    ?.find(
                      (ad_type) =>
                        ad_type.name[lang as "en" | "ar"] ===
                        form?.watch("advertising_type")
                    )
                    ?.sections?.map((section) => (
                      <FormItem
                        key={section?.id}
                        className="flex items-center space-x-3 space-y-0 bg-card/35 rounded-[20px] px-2 py-3"
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={section?.id.toString()}
                            checkIcon
                            className={cn(
                              "min-w-fit",
                              "size-7 border-none bg-greeny/10"
                            )}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {section.name[lang as "en" | "ar"]}
                        </FormLabel>
                      </FormItem>
                    ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full flex justify-between gap-5 items-start flex-wrap">
        <DurationPickerFormInput
          name="ad_period"
          className="bg-background flex-1"
          // FormItemClassName="w-full"
          label={t("period")}
          control={form.control}
        />
        <TimePicker
          className="flex-1"
          name="publishing_time"
          label={t("timeLabel")}
          control={form.control}
        />
        <DatePicker
          className="flex-1"
          name="publishing_date"
          label={t("dateLabel")}
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
