"use client";

// Global imports
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

// Local imports
import { supportAction } from "@/app/actions/supportActions";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import { SupportSchema } from "@/schema/supportSchema";

/**
 * SupportForm Component
 * Renders a form for users to submit support requests. Handles form submission
 * and displays success messages upon successful submission.
 *
 * @returns {JSX.Element} The support form component.
 */
const SupportForm = () => {
  // Fetch translations from the "Index" namespace
  const t = useTranslations("Index");

  // Initialize router for navigation
  const router = useRouter();

  // Initialize form handling with validation using Zod schema
  const form = useForm<SupportSchema>({
    resolver: zodResolver(SupportSchema),
    defaultValues: {
      message: "",
      email: "",
    },
  });

  // Define mutation for form submission with success handling
  const { mutate, isPending } = useMutation({
    mutationFn: supportAction,
    onSuccess: () => {
      toast.success(t("messageSent"));
      router.push("/");
    },
  });

  // Form submit handler
  const onSubmit = (data: SupportSchema) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mx-auto bg-card/50 border border-card-foreground/10 p-6 rounded-md text-foreground md:max-w-screen-sm px-8 flex flex-col items-center"
      >
        <div className="flex w-full flex-col items-center gap-7 min-w-[358px]">
          {/* Form title */}
          <h1 className="text-2xl text-start font-bold">{t("helpSupport")}</h1>

          {/* Form fields */}
          <div className="w-full space-y-4">
            <FormInput
              className="bg-background"
              name="email"
              label={t("email")}
              control={form.control}
            />
            <FormInputTextarea
              name="message"
              label={t("message")}
              className="resize-y"
              control={form.control}
            />

            {/* Submit button with loading state */}
            <Button
              disabled={isPending}
              className="w-full capitalize mt-8"
              type="submit"
            >
              {isPending ? <ButtonLoader /> : t("send")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SupportForm;
