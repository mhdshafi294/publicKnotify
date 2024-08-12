"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";

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
import { sendCodeAction } from "@/app/actions/authActions";

interface SignInFormProps {
  type: "podcaster" | "user" | "company";
}

/**
 * SignInForm component for handling user sign-in.
 *
 * @param {SignInFormProps} props - The properties passed to the component.
 * @returns {JSX.Element} The sign-in form component.
 *
 * @example
 * ```tsx
 * <SignInForm type="user" />
 * ```
 */
const SignInForm: React.FC<SignInFormProps> = ({ type }) => {
  const t = useTranslations("Index");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Initialize the form with validation schema and default values
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

  /**
   * Handles form submission.
   *
   * @param {loginSchema} data - The form data.
   */
  const handleSubmit = async (data: loginSchema) => {
    setLoading(true);
    try {
      const signInResponse = await signIn("credentials", {
        phone: `${data.phone.code}${data.phone.phone}`,
        password: data.password,
        type: type,
        redirect: false,
        callbackUrl: "/", // TODO: Add callback URL
      });

      if (signInResponse!.ok) {
        setLoading(false);
        toast.success(t("signedInSuccessfully"));
        router.push(`/${type}`);
      } else if (signInResponse?.error?.includes("434")) {
        setLoading(false);
        try {
          await sendCodeAction({ body: { phone: data.phone }, type });
        } catch (error) {
          toast.error(t("errorOccurred"));
          console.log(error, typeof error, "here");
        }
        toast.warning(t("verificationCodeSent"));
        router.push(
          `/${type}/verification-code?phone=${data.phone.code}${data.phone.phone}`
        );
        // throw signInResponse;
      } else if (signInResponse?.error?.includes("422")) {
        setLoading(false);
        toast.error(t("invalidPhoneOrPassword"));
        throw signInResponse?.error;
      } else if (signInResponse?.error?.includes("403")) {
        setLoading(false);
        toast.warning(t("blockedByAdmin"));
        toast.warning(t("notVerifiedByTheAdmenYet"));
        throw signInResponse?.error;
      } else {
        setLoading(false);
        toast.error(t("errorOccurred"));
        throw signInResponse?.error;
      }
    } catch (error) {
      const err = error as AxiosError;
      setLoading(false);
      if (err.response?.status == 434) {
        await sendCode({ body: { phone: data.phone }, type });
        toast.warning(t("verificationCodeSent"));
        router.push(
          `/${type}/verification-code?phone=${data.phone.code}${data.phone.phone}`
        );
      } else if (err.response?.status == 422) {
        toast.error(t("invalidPhone"));
      } else {
        toast.error(t("tryAgain"));
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-fit px-0"
        onSubmit={form.handleSubmit((data) => {
          handleSubmit(data);
        })}
      >
        <div className="flex flex-col items-center gap-9 w-[358px]">
          <h2 className="text-[32px] font-black mb-1">{t("signIn")}</h2>
          {/* Phone number input field */}
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
          <div className="w-full">
            {/* Password input field */}
            <PasswordInput
              name={"password"}
              label={t("password")}
              control={form.control}
              className="mb-2"
            />
            <Link
              href={`${type}/forgot-password`}
              className="text-sm opacity-50 font-light hover:opacity-100 duration-300"
            >
              {t("forgotPassword")}
            </Link>
          </div>
        </div>
        <Button
          disabled={loading}
          className="w-[358px] capitalize mt-9"
          type="submit"
        >
          {loading ? <ButtonLoader /> : t("continue")}
        </Button>
        <p className="text-center mt-5 font-light text-sm">
          {t("noAccount")}{" "}
          <Link
            locale="en"
            href={`/sign-up/?userType=${type}`}
            className="font-bold text-sm text-greeny"
          >
            {t("signUp")}
          </Link>
        </p>
        <div className="max-w-[360px] mt-12 mx-auto flex flex-col items-center gap-8">
          <div className="flex justify-between items-center w-full gap-4">
            <div className="w-full max-w-[146px] h-[1px] bg-white"></div>
            <span className="text-white text-lg font-bold leading-5">
              {t("or")}
            </span>
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
