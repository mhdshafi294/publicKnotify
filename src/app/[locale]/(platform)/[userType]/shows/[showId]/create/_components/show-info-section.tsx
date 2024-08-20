"use client";

import FormInput from "@/components/ui/form-input";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import { CreateShowSchema } from "@/schema/showsSchema";
import { useFormContext } from "react-hook-form";

const ShowInfoSection = () => {
  const form = useFormContext<CreateShowSchema>();
  return (
    <div className="bg-background rounded-xl px-12 py-10 space-y-5">
      <h2 className="text-2xl pb-2">01. Show Info</h2>
      <FormInput
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        control={form.control}
        name="title"
        label="Title"
      />
      <FormInputTextarea
        className="bg-foreground/10 resize-y border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        control={form.control}
        name="description"
        label="Description"
      />
    </div>
  );
};

export default ShowInfoSection;
