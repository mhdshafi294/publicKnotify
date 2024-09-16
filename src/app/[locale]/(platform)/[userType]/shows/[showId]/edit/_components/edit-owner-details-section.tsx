"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { updatePlayListAction } from "@/app/actions/podcastActions";
import ArrayFormInput from "@/components/ui/array-form-input";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form-input";
import FormInputWithPreText from "@/components/ui/form-input-with-pre-text";
import { useRouter } from "@/navigation";
import { CreateShowSchema } from "@/schema/showsSchema";
import ButtonLoader from "@/components/ui/button-loader";

interface EditOwnerDetailsSectionProps {
  showId: string;
}
/**
 * The OwnerDetailsSection component handles the form section for entering and submitting details about
 * the owner of a show, including authors, show owner, email, and copyright information.
 *
 * It uses the react-hook-form and tanstack/react-query libraries to handle form submission and API requests.
 *
 * @returns {JSX.Element} The rendered OwnerDetailsSection component.
 */
const EditOwnerDetailsSection: React.FC<EditOwnerDetailsSectionProps> = ({
  showId,
}) => {
  const form = useFormContext<CreateShowSchema>();
  const router = useRouter();
  const t = useTranslations("Index");

  const { mutate, isPending } = useMutation({
    mutationFn: updatePlayListAction,
    onSuccess: () => {
      toast.success(t("showUpdatedSuccessfully"));
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error(t("somethingWentWrong"));
    },
  });

  const handleSubmit = (data: CreateShowSchema) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("copyright", data.copyright);
    formData.append("description", data.description);
    if (data.image instanceof File) formData.append("image", data.image);
    formData.append("show_owner", data.show_owner);
    formData.append("owner_email", data.owner_email);
    formData.append("type", data.type);
    formData.append("footer", "test"); // TODO: remove this field
    data.categories.forEach((category, index) => {
      if (category) formData.append(`categories[${index}]`, category);
    });
    data.authors.forEach((author, index) => {
      if (author) formData.append(`authors[${index}]`, author);
    });
    data.tags.forEach((tag, index) => {
      if (tag) formData.append(`tags[${index}]`, tag);
    });
    formData.append("_method", "put");
    mutate({ formData, type: "podcaster", id: showId });
  };

  return (
    <div className="bg-card-secondary border border-border-secondary shadow-[2px_2px_0px_0px_#302e3e] rounded-xl px-12 py-10 space-y-5">
      <h2 className="text-2xl pb-2">{t("ownerDetailsTitle")}</h2>
      <ArrayFormInput
        name="authors"
        control={form.control}
        label={t("authorsLabel")}
        description={t("authorsDescription")}
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        defaultValues={form.getValues()}
      />
      <FormInput
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        control={form.control}
        name="show_owner"
        labelClassName="text-base"
        label={t("showOwnerLabel")}
      />
      <FormInput
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        control={form.control}
        name="owner_email"
        labelClassName="text-base"
        label={t("showEmailLabel")}
      />
      <FormInputWithPreText
        className="bg-foreground/10 border-0 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
        control={form.control}
        name="copyright"
        labelClassName="text-base"
        label={t("copyrightLabel")}
        preText="©"
      />
      <Button
        disabled={isPending}
        onClick={() => {
          form.handleSubmit(handleSubmit)();
        }}
      >
        {isPending ? <ButtonLoader /> : t("saveAndPreviewButton")}
      </Button>
    </div>
  );
};

export default EditOwnerDetailsSection;
