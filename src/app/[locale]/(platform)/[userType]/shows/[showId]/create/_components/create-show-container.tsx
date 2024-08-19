"use client";

import { CreateShowSchema } from "@/schema/showsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ShowInfoSection from "./show-info-section";
import { Form } from "@/components/ui/form";
import ShowArtworkSection from "./show-artwork-section";
import FormatSection from "./format-section";
import CategorizationSection from "./categorization-section";

const CreateShowContainer = () => {
  const form = useForm<CreateShowSchema>({
    resolver: zodResolver(CreateShowSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "all",
    },
  });

  return (
    <Form {...form}>
      <div className="py-[25vh] w-full space-y-10 max-w-screen-sm">
        <ShowInfoSection />
        <ShowArtworkSection />
        <FormatSection />
        <CategorizationSection />
        <div className="h-96 bg-background rounded-xl px-12 py-8">k</div>
        <div className="h-96 bg-background rounded-xl px-12 py-8">k</div>
      </div>
    </Form>
  );
};

export default CreateShowContainer;
