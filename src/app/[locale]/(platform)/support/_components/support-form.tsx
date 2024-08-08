"use client";

import { supportAction } from "@/app/actions/supportActions";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import { SupportSchema } from "@/schema/supportSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const SupportForm = () => {
  const t = useTranslations("Index");
  const router = useRouter();
  const form = useForm<SupportSchema>({
    resolver: zodResolver(SupportSchema),
    defaultValues: {
      message: "",
      email: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: supportAction,
    onSuccess: () => {
      toast.success(t("messageSent"));
      router.push("/");
    },
  });
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
          <h1 className="text-2xl text-start font-bold">{t("helpSupport")}</h1>
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
