"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { checkCodeSchema } from "@/schema/authSchema";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";

import ConfirmCheckCode from "@/services/auth/check-code";
import { useMutation } from "@tanstack/react-query";
import { ConfirmCheckCodeAction } from "@/app/actions/authActions";

const CheckCode = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();

  const form = useForm<checkCodeSchema>({
    resolver: zodResolver(checkCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const code = form.getValues("code");

  const {
    data,
    mutate: server_ConfirmCheckCode,
    isPending,
  } = useMutation({
    mutationFn: ConfirmCheckCodeAction,
    onSuccess: () => {
      toast.success("Confirmed!");
      router.push(
        `/${params.userType}/new-password?phone=${searchParams.phone}&code=${code}`
      );
    },
    onError: () => {
      toast.error("Something went wrong.please try again!");
    },
  });

  const handleSubmit = async (data: checkCodeSchema) => {
    server_ConfirmCheckCode({
      code: data.code,
      phone: searchParams.phone as string,
      type: params.userType,
    });
  };

  return (
    <div className="md:max-w-[752px] min-h-screen flex flex-col justify-center items-center gap-8">
      <h2>OTP Code</h2>
      <Form {...form}>
        <form
          className="w-full mt-6 md:px-0 flex flex-col items-center"
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-center gap-16">
                <FormLabel>
                  We have sent a verification code to your phone number
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={4} {...field} containerClassName="gap-6">
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            className="w-[264px] capitalize mx-auto mt-20"
            type="submit"
          >
            {isPending ? <ButtonLoader /> : "Confirm"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CheckCode;
