"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import country from "country-list-js";

import { Link, useRouter } from "@/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/authSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import PasswordInput from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import FormCheckbox from "@/components/ui/form-checkbox";
import { AppleLogin } from "@/components/apple-login";
import { GoogleLogin } from "@/components/google-login";
import FormFileInput from "@/components/ui/form-input-file";
import PhoneNumberInput from "@/components/phone-number-input";
import { useMutation } from "@tanstack/react-query";
import { signUpAction } from "@/app/actions/authActions";

interface SignUpFormProps {
  type: "podcaster" | "user" | "company";
}

const SignUpForm: React.FC<SignUpFormProps> = ({ type }) => {
  const router = useRouter();

  const form = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      full_name: "",
      phone: {
        code: "",
        phone: "",
      },
      password: "",
      password_confirmation: "",
      documents: new File([], ""),
      type: type,
      terms: false,
    },
  });

  const phone = form.getValues("phone");

  const {
    data,
    mutate: server_signUp,
    isPending,
  } = useMutation({
    mutationFn: signUpAction,
    onSuccess: () => {
      toast.warning("Please verify your account!.");
      router.push(
        `${type}/verification-code?phone=${phone.code}${phone.phone}`
      );
    },
    onError: (error) => {
      if (error.message.includes("422")) {
        toast.error("The phone has already been taken.");
      } else {
        toast.error("Something went wrong.please try again!");
      }
    },
  });

  const handleSubmit = async (data: signUpSchema) => {
    const formData = new FormData();
    const countriesCode = (
      Object.values(country.all) as {
        name: string;
        dialing_code: string;
        iso2: string;
      }[]
    ).find((country) => country.dialing_code === data.phone.code)?.iso2;
    formData.append("full_name", data.full_name);
    formData.append("phone", `${data.phone.code}${data.phone.phone}`);
    formData.append("iso_code", countriesCode!);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    if (type === "company" && data.documents)
      formData.append("document", data.documents);

    server_signUp({ formData, type });
  };

  return (
    <Form {...form}>
      <form
        className="w-full px-0"
        onSubmit={form.handleSubmit((data) => {
          handleSubmit(data);
        })}
      >
        <div className="flex flex-col items-center gap-7 min-w-[358px]">
          <h2 className="text-[32px] font-black mb-1">Sign Up</h2>
          <div className="flex flex-col md:flex-row w-full justify-between gap-9">
            <FormInput name="full_name" label="Name" control={form.control} />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone</FormLabel>
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
          </div>
          <div className="flex flex-col md:flex-row w-full justify-between gap-9">
            <PasswordInput
              name={"password"}
              label={"Password"}
              control={form.control}
            />
            <PasswordInput
              name={"password_confirmation"}
              label={"Confirm Password"}
              control={form.control}
            />
          </div>
          {type === "company" && (
            <FormFileInput
              name="documents"
              label="Docs"
              control={form.control}
              className="w-full"
            />
          )}
        </div>
        <FormCheckbox
          name="terms"
          control={form.control}
          checkboxClassName="rounded-full size-4"
          label="I accept the terms and privacy policy"
        />
        <Button
          disabled={isPending}
          className="w-full capitalize mt-8"
          type="submit"
        >
          {isPending ? <ButtonLoader /> : "Continue"}
        </Button>
        <p className="text-center mt-5 font-light text-sm">
          Do you already have an account?{" "}
          <Link
            locale="en"
            href="/sign-in"
            className="font-bold text-sm text-greeny"
          >
            Sign In
          </Link>
        </p>
        <div className="max-w-[360px] mt-12 mx-auto flex flex-col items-center gap-8">
          <div className="flex justify-between items-center w-full gap-4">
            <div className="w-full max-w-[146px] h-[1px] bg-white"></div>
            <span className="text-white text-lg font-bold leading-5">OR</span>
            <div className="w-full max-w-[146px] h-[1px] bg-white"></div>
          </div>
          <div className="flex justify-between w-full max-w-[70px] mb-5">
            <AppleLogin />
            <GoogleLogin />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
