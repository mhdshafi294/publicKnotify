"use client";

import { CreateShowSchema } from "@/schema/showsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ShowInfoSection from "./show-info-section";
import { Form } from "@/components/ui/form";
import ShowArtworkSection from "./show-artwork-section";
import FormatSection from "./format-section";
import CategorizationSection from "./categorization-section";
import OwnerDetailsSection from "./owner-details-section";

const CreateShowContainer = () => {
  const form = useForm<CreateShowSchema>({
    resolver: zodResolver(CreateShowSchema),
    defaultValues: {
      authors: [],
      categories: [],
      categories1: [],
      copyright: "",
      image: new File([], ""),
      name: "",
      owner_email: "",
      show_owner: "",
      tags: [],
      description: "",
      type: "1",
    },
  });

  return (
    <Form {...form}>
      <div className="py-[25vh] w-full space-y-10 max-w-screen-sm">
        <ShowInfoSection />
        <ShowArtworkSection />
        <FormatSection />
        <CategorizationSection />
        <OwnerDetailsSection />
      </div>
    </Form>
  );
};

export default CreateShowContainer;
