"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/authSchema";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import PasswordInput from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { Checkbox } from "@/components/ui/checkbox";
import FormCheckbox from "@/components/ui/form-checkbox";
import { Link } from "@/navigation";
import axiosInstance from "@/lib/axios.config";
import { REGISTER_URL } from "@/lib/apiEndPoints";
import SignUp from "../page";
import { AppleLogin } from "@/components/apple-login";
import { GoogleLogin } from "@/components/google-login";
import FormFileInput from "@/components/ui/form-input-file";

interface SignUpFormProps {
  type: "podcaster" | "user" | "company";
}

const SignUpForm: React.FC<SignUpFormProps> = ({ type }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      password: "",
      password_confirmation: "",
      docs: new File([], ""),
      type: type,
      terms: false,
    },
  });

  const handleSubmit = async (data: signUpSchema) => {
    setLoading(true);
    let sigUpData = {};

    if (type === "company") {
      sigUpData = {
        full_name: data.full_name,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
        docs: data.docs,
      };
    } else {
      sigUpData = {
        full_name: data.full_name,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
      };
    }

    await axiosInstance
      .post(`${type}${REGISTER_URL}`, sigUpData)
      .then((res) => {
        const response = res.data;
        setLoading(false);
        toast.success("Account created successfully!.");
        // console.log(response?.data);
        // console.log(response);
        // signIn("Credentials", {
        //   phone: form.getValues("phone"),
        //   password: form.getValues("password"),
        //   type: "podcaster",
        //   redirect: false,
        // });
        setLoading(false);
        form.reset({});
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status == 422) {
          console.log(err);
        } else {
          toast.error("Something went wrong.please try again!");
        }
      });
  };

  return (
    <Form {...form}>
      <form
        className="w-full px-5 md:px-0"
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
          toast(data.full_name);
          handleSubmit(data);
        })}
      >
        <div className="flex flex-col items-center gap-7">
          <h2 className="text-[32px] font-black mb-1">Sign Up</h2>
          <div className="flex flex-col md:flex-row w-full justify-between gap-9">
            <FormInput name="full_name" label="Name" control={form.control} />
            <FormInput name="phone" label="Phone" control={form.control} />
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
            <FormFileInput name="docs" label="docs" control={form.control} />
          )}
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
          {loading ? <ButtonLoader /> : "Continue"}
        </Button>
        <p className="text-center mt-5 font-light md:text-xl">
          Do you already have an account?{" "}
          <Link
            locale="en"
            href="/sign-in"
            className="font-bold md:text-xl text-greeny"
          >
            Sign In
          </Link>
        </p>
        <div className="max-w-[360px] mt-12 mx-auto flex flex-col items-center gap-8">
          <div className="flex justify-between items-end w-full gap-4">
            <div className="w-full max-w-[146px] h-[1px] bg-white"></div>
            <span className="text-white text-lg font-bold leading-5">OR</span>
            <div className="w-full max-w-[146px] h-[1px] bg-white"></div>
          </div>
          <div className="flex justify-between w-full max-w-[70px]">
            <AppleLogin />
            <GoogleLogin />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
