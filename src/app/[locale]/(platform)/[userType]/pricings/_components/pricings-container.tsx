"use client";
import { createOrCreatePriceAction } from "@/app/actions/profileActions";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { EditPricingSchema } from "@/schema/pricingsSchema";
import usePricingsStore from "@/store/edit-pricings-store";
import { Price } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PricingCard from "./pricing-card";

type PropsType = {
  pricings: Price | null;
};

const PricingsContainer: FC<PropsType> = ({ pricings }) => {
  const editMode = usePricingsStore((state) => state.editMode);
  const setEditMode = usePricingsStore((state) => state.setEditMode);
  const [currentPricings, setCurrentPricings] = useState<Price | null>(
    pricings
  );
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

  const { mutate, isPending, error } = useMutation({
    mutationFn: createOrCreatePriceAction,
    onSuccess: () => {
      toast.success("Pricings updated successfully");
      setCurrentPricings({
        created_at: new Date().toString(),
        end: form.getValues().end,
        first: form.getValues().first,
        middle: form.getValues().middle,
        video: form.getValues().video,
        id: 0,
        is_enabled: true,
      });
      setEditMode(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate({ body: data }))}
        className="w-full py-2 flex gap-4 flex-col justify-start items-start"
      >
        <PricingCard
          name="first"
          text="First podcast"
          price={currentPricings?.first}
        />
        <PricingCard
          name="middle"
          text="Middle"
          price={currentPricings?.middle}
        />
        <PricingCard name="end" text="End" price={currentPricings?.end} />
        <PricingCard
          name="video"
          text="Adding a video"
          price={currentPricings?.video}
        />
        {editMode ? (
          <DialogFooter className="flex">
            <Button size="lg" className="capitalize">
              Save
            </Button>
            <Button
              onClick={() => setEditMode(false)}
              variant="outline"
              type="button"
              size="lg"
              className="capitalize"
            >
              cancel
            </Button>
          </DialogFooter>
        ) : null}
      </form>
    </Form>
  );
};

export default PricingsContainer;
