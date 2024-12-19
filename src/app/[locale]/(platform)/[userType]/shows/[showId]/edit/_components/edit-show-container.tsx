"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getPlayListAction } from "@/app/actions/podcastActions";
import { Form } from "@/components/ui/form";
import { CreateShowSchema } from "@/schema/showsSchema";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CategorizationSection from "../../../create/_components/categorization-section";
import FormatSection from "../../../create/_components/format-section";
import ShowArtworkSection from "../../../create/_components/show-artwork-section";
import ShowInfoSection from "../../../create/_components/show-info-section";
import EditOwnerDetailsSection from "./edit-owner-details-section";

interface EditShowContainerProps {
  showId: string;
}

/**
 * The CreateShowContainer component handles the form logic and layout for creating a new show.
 * It includes sections for show information, artwork, format, categorization, and owner details.
 * The form is validated using Zod and React Hook Form.
 *
 * @returns {JSX.Element} The rendered CreateShowContainer component.
 */
const EditShowContainer: React.FC<EditShowContainerProps> = ({ showId }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Fetch podcast draft data
  const { data, isPending, isError } = useQuery({
    queryKey: ["show", showId],
    queryFn: () => getPlayListAction({ id: showId, type: "podcaster" }),
    enabled: !!showId && isMounted,
  });

  // Reset form with draft data
  useEffect(() => {
    if (data) {
      const showData = data?.playlist;
      form.reset({
        name: showData.name,
        description: showData.description,
        type:
          typeof showData.type === "string"
            ? showData.type
            : showData.type?.toString(),
        copyright: showData.copyright ? showData.copyright : "",
        image: showData.image ? showData.image : new File([], ""),
        owner_email: showData.owner_email ? showData.owner_email : "",
        show_owner: showData.show_owner ? showData.show_owner : "",
        tags: showData.tags,
        authors: showData.authors,
        categories: showData.categories
          ? showData.categories.map((category) => category?.id.toString())
          : [],
        categories1: showData.categories
          ? showData.categories.map((category) =>
              category?.parent_id?.toString()
            )
          : [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showId, data]);

  return (
    <Form {...form}>
      <div className="py-[25vh] w-full space-y-10 max-w-screen-sm">
        <ShowInfoSection />
        <ShowArtworkSection />
        <FormatSection />
        <CategorizationSection />
        <EditOwnerDetailsSection showId={showId} />
      </div>
    </Form>
  );
};

export default EditShowContainer;
