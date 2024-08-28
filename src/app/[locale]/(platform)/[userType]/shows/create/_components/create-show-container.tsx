"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateShowSchema } from "@/schema/showsSchema";
import { Form } from "@/components/ui/form";
import ShowInfoSection from "./show-info-section";
import ShowArtworkSection from "./show-artwork-section";
import FormatSection from "./format-section";
import CategorizationSection from "./categorization-section";
import OwnerDetailsSection from "./owner-details-section";

/**
 * The CreateShowContainer component handles the form logic and layout for creating a new show.
 * It includes sections for show information, artwork, format, categorization, and owner details.
 * The form is validated using Zod and React Hook Form.
 *
 * @returns {JSX.Element} The rendered CreateShowContainer component.
 */
const CreateShowContainer: React.FC = () => {
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
