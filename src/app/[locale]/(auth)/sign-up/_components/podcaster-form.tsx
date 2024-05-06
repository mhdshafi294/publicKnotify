"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/authSchema";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import PasswordInput from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import FormCheckbox from "@/components/ui/form-checkbox";
import { Link } from "@/navigation";

const PodcasterForm = () => {
  const form = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      password_confirmation: "",
      terms: false,
    },
  });

  return (
    <Form {...form}>
      <form
        className="w-full"
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
          toast(data.name);
        })}
      >
        <div className="flex flex-col items-center gap-7">
          <h2 className="text-[32px] font-black mb-1">Sign Up</h2>
          <div className="flex w-full justify-between gap-9">
            <FormInput name="name" label="Name" control={form.control} />
            <FormInput name="phone" label="Phone" control={form.control} />
          </div>
          <div className="flex w-full justify-between gap-9">
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
        </div>
        <FormCheckbox
          name="terms"
          control={form.control}
          className="rounded-full size-7"
          label="I accept the terms and privacy policy"
        />
        <Button
          // disabled={isPending}
          className="w-full capitalize mt-8"
          type="submit"
        >
          {false ? <ButtonLoader /> : "Continue"}
        </Button>
        <p className="text-center mt-5 font-light text-xl">
          Do you already have an account?{" "}
          <Link
            locale="en"
            href="/sign-in"
            className="font-bold text-xl text-greeny"
          >
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default PodcasterForm;
