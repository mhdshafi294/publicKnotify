"use client";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/authSchema";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import PasswordInput from "@/components/ui/password-input";

const PodcasterForm = () => {
  const form = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  return (
    <Form {...form}>
      <form className="w-full">
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
      </form>
    </Form>
  );
};

export default PodcasterForm;
