"use client";

// External Imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Internal Imports
import { createOrCreatePriceAction } from "@/app/actions/profileActions";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import Loader from "@/components/ui/loader";
import { EditPricingSchema } from "@/schema/pricingsSchema";
import usePricingsStore from "@/store/use-edit-pricings-store";
import { Price } from "@/types/profile";
import ProfilePriceSwitcher from "../../profile/_components/profile-price-switcher";
import PricingCard from "./pricing-card";

/**
 * PricingsContainer Component
 * Manages the state and form submission for pricing data.
 *
 * @param {PropsType} props - The props for the component.
 * @param {Price | null} props.pricings - The initial pricing data.
 *
 * @returns {JSX.Element} The container with pricing form and details.
 */
const PricingsContainer: FC<{ pricings: Price[] }> = ({ pricings }) => {
  // Retrieve edit mode state and the function to set it from the store
  const editMode = usePricingsStore((state) => state.editMode);
  const setEditMode = usePricingsStore((state) => state.setEditMode);

  // Manage the current pricing data in local state
  const [currentPricings, setCurrentPricings] = useState<Price[]>(pricings);

  // Use the next-intl hook for translations
  const t = useTranslations("Index");

  const locale = useLocale();
  console.log(locale, "<<<<locale");

  // Initialize the form using react-hook-form with Zod validation schema
  const form = useForm<EditPricingSchema>({
    resolver: zodResolver(EditPricingSchema),
    defaultValues: {
      "Pre roll":
        currentPricings
          ?.find((item) => item.name.en === "Regular")
          ?.sections.find((item) => item.name.en === "Pre roll")
          ?.podcaster_prices[0]?.price?.toString() || "",
      "Mid roll":
        currentPricings
          ?.find((item) => item.name.en === "Regular")
          ?.sections.find((item) => item.name.en === "Mid roll")
          ?.podcaster_prices[0]?.price?.toString() || "",
      "Post roll":
        currentPricings
          ?.find((item) => item.name.en === "Regular")
          ?.sections.find((item) => item.name.en === "Post roll")
          ?.podcaster_prices[0]?.price?.toString() || "",
      "Section Of Episode":
        currentPricings
          ?.find((item) => item.name.en === "Sponsorship")
          ?.sections.find((item) => item.name.en === "Section Of Episode")
          ?.podcaster_prices[0]?.price?.toString() || "",
      "Visual Brand Representation":
        currentPricings
          ?.find((item) => item.name.en === "Sponsorship")
          ?.sections.find(
            (item) => item.name.en === "Visual Brand Representation"
          )
          ?.podcaster_prices[0]?.price?.toString() || "",
      "Full Episode":
        currentPricings
          ?.find((item) => item.name.en === "Hosting")
          ?.sections.find((item) => item.name.en === "Full Episode")
          ?.podcaster_prices[0]?.price?.toString() || "",
    },
  });

  // Set up mutation for creating or updating pricing data
  const {
    mutate: createOrCreatePrice_serverAction,
    isPending,
    error,
  } = useMutation({
    mutationFn: createOrCreatePriceAction,
    onSuccess: () => {
      // Show success message when the mutation succeeds
      toast.success(t("updateSuccess"));

      // Update the current pricing data state
      setCurrentPricings((prev) => [
        {
          ...prev![0],
          updated_at: new Date().toISOString(),
          sections: [
            {
              ...prev![0].sections[0],
              updated_at: new Date().toISOString(),
              podcaster_prices: [
                {
                  price: Number(form.getValues("Pre roll")),
                },
              ],
            },
            {
              ...prev![0].sections[1],
              updated_at: new Date().toISOString(),
              podcaster_prices: [
                {
                  price: Number(form.getValues("Mid roll")),
                },
              ],
            },
            {
              ...prev![0].sections[2],
              updated_at: new Date().toISOString(),
              podcaster_prices: [
                {
                  price: Number(form.getValues("Post roll")),
                },
              ],
            },
          ],
        },
        {
          ...prev![1],
          updated_at: new Date().toISOString(),
          sections: [
            {
              ...prev![1].sections[0],
              updated_at: new Date().toISOString(),
              podcaster_prices: [
                {
                  price: Number(form.getValues("Section Of Episode")),
                },
              ],
            },
            {
              ...prev![1].sections[1],
              updated_at: new Date().toISOString(),
              podcaster_prices: [
                {
                  price: Number(form.getValues("Visual Brand Representation")),
                },
              ],
            },
          ],
        },
        {
          ...prev![2],
          updated_at: new Date().toISOString(),
          sections: [
            {
              ...prev![2].sections[0],
              updated_at: new Date().toISOString(),
              podcaster_prices: [
                {
                  price: Number(form.getValues("Full Episode")),
                },
              ],
            },
          ],
        },
      ]);

      // Exit edit mode after successful save
      setEditMode(false);
    },
    onError: (err) => {
      // Log error if the mutation fails
      console.error(err);
    },
  });

  const handleSubmit = (data: EditPricingSchema) => {
    console.log(data["Full Episode"], Number(data["Full Episode"]));
    let dataArray = [];
    Number(data["Pre roll"]) > 0 &&
      dataArray.push({
        price: Number(data["Pre roll"]),
        advertising_section_id: currentPricings
          ?.find((item) => item.name.en === "Regular")
          ?.sections.find((item) => item.name.en === "Pre roll")?.id as number,
      });
    Number(data["Mid roll"]) > 0 &&
      dataArray.push({
        price: Number(data["Mid roll"]),
        advertising_section_id: currentPricings
          ?.find((item) => item.name.en === "Regular")
          ?.sections.find((item) => item.name.en === "Mid roll")?.id as number,
      });
    Number(data["Post roll"]) > 0 &&
      dataArray.push({
        price: Number(data["Post roll"]),
        advertising_section_id: currentPricings
          ?.find((item) => item.name.en === "Regular")
          ?.sections.find((item) => item.name.en === "Post roll")?.id as number,
      });
    Number(data["Section Of Episode"]) > 0 &&
      dataArray.push({
        price: Number(data["Section Of Episode"]),
        advertising_section_id: currentPricings
          ?.find((item) => item.name.en === "Sponsorship")
          ?.sections.find((item) => item.name.en === "Section Of Episode")
          ?.id as number,
      });
    Number(data["Visual Brand Representation"]) > 0 &&
      dataArray.push({
        price: Number(data["Visual Brand Representation"]),
        advertising_section_id: currentPricings
          ?.find((item) => item.name.en === "Sponsorship")
          ?.sections.find(
            (item) => item.name.en === "Visual Brand Representation"
          )?.id as number,
      });
    Number(data["Full Episode"]) > 0 &&
      dataArray.push({
        price: Number(data["Full Episode"]),
        advertising_section_id: currentPricings
          ?.find((item) => item.name.en === "Hosting")
          ?.sections.find((item) => item.name.en === "Full Episode")
          ?.id as number,
      });

    createOrCreatePrice_serverAction({
      body: {
        data: dataArray,
      },
    });
  };

  return (
    <Form {...form}>
      {/* The form for submitting pricing data */}
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full py-2 flex gap-8 flex-col justify-start items-start"
      >
        {currentPricings?.map((item, index) => (
          <div key={item?.id} className="space-y-8">
            <div className="flex items-center gap-5 ">
              <div className="flex items-center gap-2 ">
                <div
                  style={{
                    backgroundImage: `linear-gradient(270deg, rgba(47, 234, 155, 0.15) 15.5%, rgba(127, 221, 83, 0.15) 85.5%)`,
                  }}
                  className="size-7 rounded-full flex justify-center items-center"
                >
                  {index + 1}
                </div>
                <h1 className="text-2xl font-semibold">
                  {item?.name[locale as "en" | "ar"]}
                </h1>
              </div>
              <ProfilePriceSwitcher
                is_enabled_price={item?.is_enabled!}
                profileType={"podcaster"}
                isSelfProfile
                ad_type_id={item?.id.toString()}
              />
            </div>
            <div className="w-full flex flex-wrap gap-5">
              {item.sections.map((section) => (
                <PricingCard
                  key={section?.id}
                  name={section.name.en}
                  text={section.name[locale as "en" | "ar"]}
                  price={section.podcaster_prices[0]?.price?.toString()}
                />
              ))}
            </div>
          </div>
        ))}
        {/* Show save and cancel buttons if in edit mode */}
        {editMode ? (
          <DialogFooter className="w-full flex justify-end gap-2 items-center">
            <Button
              onClick={() => setEditMode(false)}
              variant="outline"
              type="button"
              size="lg"
              className="capitalize rounded-full font-bold"
            >
              {t("cancel")}
            </Button>
            <Button size="lg" className="capitalize rounded-full font-bold">
              {isPending ? <Loader className="mr-2 animate-spin" /> : null}
              {t("save-changes")}
            </Button>
          </DialogFooter>
        ) : null}
      </form>
    </Form>
  );
};

export default PricingsContainer;
