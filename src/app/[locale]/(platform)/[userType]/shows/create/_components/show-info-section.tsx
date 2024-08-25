"use client";

import FormInput from "@/components/ui/form-input";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import { CreateShowSchema } from "@/schema/showsSchema";
import { useFormContext } from "react-hook-form";

const ShowInfoSection = () => {
  const form = useFormContext<CreateShowSchema>();

  return (
    <div className="bg-card-secondary border border-border-secondary shadow-[2px_2px_0px_0px_#302e3e] rounded-xl px-12 py-10 space-y-5">
      <h2 className="text-2xl pb-2">01. Show Info</h2>
      <FormInput
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        control={form.control}
        name="name"
        labelClassName="text-base"
        label="Title"
      />
      <FormInputTextarea
        className="bg-foreground/10 resize-y border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        control={form.control}
        labelClassName="text-base"
        name="description"
        label="Description"
      />
    </div>
  );
};

export default ShowInfoSection;
