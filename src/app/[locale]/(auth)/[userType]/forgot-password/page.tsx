"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";

import { forgotPasswordSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import PhoneNumberInput from "@/components/phone-number-input";
import { useMutation } from "@tanstack/react-query";
import { sendCodeAction } from "@/app/actions/authActions";

const ForgotPassword = ({ params }: { params: { userType: string } }) => {
  const router = useRouter();
  const t = useTranslations("Auth");

  const form = useForm<forgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: {
        code: "",
        phone: "",
      },
    },
  });

  const phone = form.getValues("phone");

  const {
    data,
    mutate: server_sendCodeAction,
    isPending,
  } = useMutation({
    mutationFn: sendCodeAction,
    onSuccess: () => {
      toast.success(t("confirmed"));
      router.push(
        `/${params.userType}/check-code?&phone=${phone?.code}${
          phone?.phone as string
        }`
      );
    },
    onError: () => {
      toast.error(t("errorTryAgain"));
    },
  });

  const handleSubmit = async (data: forgotPasswordSchema) => {
    server_sendCodeAction({ body: data, type: params.userType });
  };

  return (
    <div className="md:w-[360px] min-h-screen flex flex-col justify-center items-center gap-8">
      <h2>{t("forgotPassword")}</h2>
      <p className="text-xs">{t("enterPhoneNumber")}</p>
      <Form {...form}>
        <form
          className="w-full mt-6 md:px-0 flex flex-col items-center"
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("phone")}</FormLabel>
                <FormControl>
                  <PhoneNumberInput
                    phone={field.value}
                    setPhone={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            className="md:w-[360px] capitalize mx-auto mt-14"
            type="submit"
          >
            {isPending ? <ButtonLoader /> : t("confirm")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;
