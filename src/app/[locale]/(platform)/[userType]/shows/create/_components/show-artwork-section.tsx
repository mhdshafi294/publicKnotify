"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FileInputDropzone from "./file-input-dropzone";
import { CreateShowSchema } from "@/schema/showsSchema";

/**
 * The ShowArtworkSection component renders a form section for uploading the artwork of the show.
 * It uses a file input dropzone for handling file uploads.
 *
 * @returns {JSX.Element} The rendered ShowArtworkSection component.
 */
const ShowArtworkSection: React.FC = () => {
  const form = useFormContext<CreateShowSchema>();
  const t = useTranslations("Index");

  return (
    <div className="bg-card-secondary border border-border-secondary shadow-[2px_2px_0px_0px_#302e3e] rounded-xl px-12 py-10 space-y-5">
      <h2 className="text-2xl pb-2">{t("show-artwork")}</h2>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FileInputDropzone file={field.value} setFile={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ShowArtworkSection;
