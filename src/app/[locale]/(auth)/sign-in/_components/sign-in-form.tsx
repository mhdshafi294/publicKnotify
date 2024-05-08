"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authSchema";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import PasswordInput from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { Link, useRouter } from "@/navigation";
import { AppleLogin } from "@/components/apple-login";
import { GoogleLogin } from "@/components/google-login";
import signInAxios from "@/services/sign-in";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

interface SignInFormProps {
  type: "podcaster" | "user" | "company";
}

const SignInForm: React.FC<SignInFormProps> = ({ type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const handleSubmit = async (data: loginSchema) => {
    setLoading(true);
    try {
      // await signInAxios(data, type);
      signIn("credentials", {
        phone: data.phone,
        password: data.password,
        type: type,
        redirect: false,
        // callbackUrl: "/", // TODO: Add callback url
      });
      toast.success("Signed In successfully!.");
      router.push("/");
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status == 422) {
        console.log(err);
        toast.error("The phone has already been taken.");
      } else {
        console.log(err);
        toast.error("Something went wrong.please try again!");
      }
    }
    setLoading(false);
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
          <FormInput name="phone" label="Phone" control={form.control} />
          <div className="w-full">
            <PasswordInput
              name={"password"}
              label={"Password"}
              control={form.control}
              className="mb-2"
            />
            <Link
              href="/forgot-password"
              className="text-sm opacity-50 font-light hover:opacity-100 duration-300"
            >
              Forget password
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
          <div className="flex justify-between w-full max-w-[70px]">
            <AppleLogin />
            <GoogleLogin />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
