"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authSchema";
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
import { Link, useRouter } from "@/navigation";
import { AppleLogin } from "@/components/apple-login";
import { GoogleLogin } from "@/components/google-login";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import sendCode from "@/services/auth/send-code";
import PhoneNumberInput from "@/components/phone-number-input";

interface SignInFormProps {
  type: "podcaster" | "user" | "company";
}

const SignInForm: React.FC<SignInFormProps> = ({ type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: {
        code: "",
        phone: "",
      },
      password: "",
    },
  });

  const handleSubmit = async (data: loginSchema) => {
    setLoading(true);
    try {
      const signInResponse = await signIn("credentials", {
        phone: `${data.phone.code}${data.phone.phone}`,
        password: data.password,
        type: type,
        redirect: false,
        callbackUrl: "/", // TODO: Add callback url
      });
      console.log(signInResponse);
      if (signInResponse!.ok) {
        setLoading(false);
        toast.success("Signed In successfully!.");
        router.push("/");
      } else if (signInResponse?.error?.includes("434")) {
        setLoading(false);
        await sendCode({ phone: data.phone }, type);
        router.push(
          `/${type}/verification-code?phone=${data.phone.code}${data.phone.phone}`
        );
        toast.warning("A new verification code has been sent to your phone");
      } else if (signInResponse?.error?.includes("422")) {
        setLoading(false);
        toast.error("The selected phone or its password is invalid.");
      } else if (signInResponse?.error?.includes("403")) {
        setLoading(false);
        toast.warning("You have been blocked by the admin. Please contact us.");
      } else {
        setLoading(false);
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      const err = error as AxiosError;
      setLoading(false);
      if (err.response?.status == 434) {
        await sendCode({ phone: data.phone }, type);
        router.push(
          `/${type}/verification-code?phone=${data.phone.code}${data.phone.phone}`
        );
        toast.warning("A new verification code has been sent to your phone");
      } else if (err.response?.status == 422) {
        console.log(err);
        toast.error("The selected phone is invalid.");
      } else {
        console.log(err);
        toast.error("Something went wrong.please try again!");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-fit px-5 md:px-0"
        onSubmit={form.handleSubmit((data) => {
          handleSubmit(data);
        })}
      >
        <div className="flex flex-col items-center gap-9 w-[358px]">
          <h2 className="text-[32px] font-black mb-1">Sign In</h2>
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
          <div className="w-full">
            <PasswordInput
              name={"password"}
              label={"Password"}
              control={form.control}
              className="mb-2"
            />
            <Link
              href={`${type}/forgot-password`}
              className="text-sm opacity-50 font-light hover:opacity-100 duration-300"
            >
              Forgot password
            </Link>
          </div>
        </div>
        <Button
          disabled={loading}
          className="w-[358px] capitalize mt-9"
          type="submit"
        >
          {loading ? <ButtonLoader /> : "Continue"}
        </Button>
        <p className="text-center mt-5 font-light text-sm">
          Don&apos;t have an account?{" "}
          <Link
            locale="en"
            href="/sign-up"
            className="font-bold text-sm text-greeny"
          >
            Sign Up
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

export default SignInForm;
