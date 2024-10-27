"use client";

// External Imports
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

// Internal Imports
import { createOrCreatePriceAction } from "@/app/actions/profileActions";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { EditPricingSchema } from "@/schema/pricingsSchema";
import usePricingsStore from "@/store/use-edit-pricings-store";
import { Price } from "@/types/profile";
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
const PricingsContainer: FC<{ pricings: Price | null }> = ({ pricings }) => {
  // Retrieve edit mode state and the function to set it from the store
  const editMode = usePricingsStore((state) => state.editMode);
  const setEditMode = usePricingsStore((state) => state.setEditMode);

  // Manage the current pricing data in local state
  const [currentPricings, setCurrentPricings] = useState<Price | null>(
    pricings
  );

  // Initialize the form using react-hook-form with Zod validation schema
  const form = useForm<EditPricingSchema>({
    resolver: zodResolver(EditPricingSchema),
    defaultValues: currentPricings
      ? currentPricings
      : {
          end: "",
          first: "",
          middle: "",
          video: "",
        },
  });

  // Use the next-intl hook for translations
  const t = useTranslations("Index");

  // Set up mutation for creating or updating pricing data
  const { mutate, isPending, error } = useMutation({
    mutationFn: createOrCreatePriceAction,
    onSuccess: () => {
      // Show success message when the mutation succeeds
      toast.success(t("updateSuccess"));

      // Update the current pricing data state
      setCurrentPricings({
        created_at: new Date().toString(),
        end: form.getValues().end,
        first: form.getValues().first,
        middle: form.getValues().middle,
        video: form.getValues().video,
        id: 0,
        is_enabled: true,
      });

      // Exit edit mode after successful save
      setEditMode(false);
    },
    onError: (err) => {
      // Log error if the mutation fails
      console.error(err);
    },
  });

  return (
    <Form {...form}>
      {/* The form for submitting pricing data */}
      <form
        onSubmit={form.handleSubmit((data) => mutate({ body: data }))}
        className="w-full py-2 flex gap-4 flex-col justify-start items-start"
      >
        {/* Display the pricing cards with prices for different sections */}
        <PricingCard
          name="first"
          text={t("first")}
          price={currentPricings?.first}
        />
        <PricingCard
          name="middle"
          text={t("middle")}
          price={currentPricings?.middle}
        />
        <PricingCard name="end" text={t("end")} price={currentPricings?.end} />
        <PricingCard
          name="video"
          text={t("addingVideo")}
          price={currentPricings?.video}
        />

        {/* Show save and cancel buttons if in edit mode */}
        {editMode ? (
          <DialogFooter className="flex">
            <Button size="lg" className="capitalize">
              {t("save")}
            </Button>
            <Button
              onClick={() => setEditMode(false)}
              variant="outline"
              type="button"
              size="lg"
              className="capitalize"
            >
              {t("cancel")}
            </Button>
          </DialogFooter>
        ) : null}
      </form>
    </Form>
  );
};

export default PricingsContainer;
