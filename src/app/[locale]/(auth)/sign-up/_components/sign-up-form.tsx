"use client";
import country from "country-list-js";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signUpAction } from "@/app/actions/authActions";
import { AppleLogin } from "@/components/apple-login";
import { GoogleLogin } from "@/components/google-login";
import PhoneNumberInput from "@/components/phone-number-input";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormCheckbox from "@/components/ui/form-checkbox";
import FormInput from "@/components/ui/form-input";
import FormFileInput from "@/components/ui/form-input-file";
import PasswordInput from "@/components/ui/password-input";
import { Link, useRouter } from "@/navigation";
import { signUpSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

interface SignUpFormProps {
  type: "podcaster" | "user" | "company";
}

/**
 * SignUpForm component for handling user sign-up.
 *
 * @param {SignUpFormProps} props - The properties passed to the component.
 * @returns {JSX.Element} The sign-up form component.
 *
 * @example
 * ```tsx
 * <SignUpForm type="user" />
 * ```
 */
const SignUpForm: React.FC<SignUpFormProps> = ({ type }) => {
  const router = useRouter();
  const t = useTranslations("Index");

  // Initialize the form with validation schema and default values
  const form = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      full_name: "",
      phone: {
        code: "971",
        phone: "",
      },
      password: "",
      password_confirmation: "",
      documents: new File([], ""),
      type: type,
      terms: false,
    },
  });

  useEffect(() => {
    console.log(form.getValues("phone"));
  }, [form]);

  const phone = form.getValues("phone");

  // Initialize the mutation for signing up the user
  const { mutate: server_signUp, isPending } = useMutation({
    mutationFn: signUpAction,
    onSuccess: (data) => {
      if (typeof data === "string") {
        console.error(data);
        toast.dismiss();
        toast.error(data);
      } else {
        toast.warning(t("verifyAccount"));
        router.push(
          `/${type}/verification-code?phone_code=${phone.code}&phone=${phone.phone}`
        );
      }
    },
    onError: (error) => {
      if (error.message.includes("422")) {
        toast.error(t("phoneTaken"));
      } else {
        toast.error(t("errorTryAgain"));
      }
    },
  });

  /**
   * Handles form submission.
   *
   * @param {signUpSchema} data - The form data.
   */
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
          <div className="flex flex-col md:flex-row w-full justify-between gap-9">
            {/* Full name input field */}
            <FormInput
              name="full_name"
              label={t("name")}
              control={form.control}
              className="text-black dark:text-white"
            />
            {/* Phone number input field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="capitalize text-lg">
                    {t("phone")}
                  </FormLabel>
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
            {/* Password input field */}
            <PasswordInput
              name={"password"}
              label={t("password")}
              control={form.control}
              className="text-black dark:text-white"
            />
            {/* Password confirmation input field */}
            <PasswordInput
              name={"password_confirmation"}
              label={t("confirmPassword")}
              control={form.control}
              className="text-black dark:text-white"
            />
          </div>
          {/* Document upload field for company sign-up */}
          {type === "company" && (
            <FormFileInput
              name="documents"
              label={t("docs")}
              control={form.control}
              className="w-full"
            />
          )}
        </div>
        {/* Terms and conditions checkbox */}
        <FormCheckbox
          name="terms"
          control={form.control}
          checkboxClassName="rounded-full size-4"
          label={t("acceptTerms")}
        />
        {/* Submit button */}
        <Button
          disabled={isPending}
          className="w-full capitalize mt-8"
          type="submit"
        >
          {isPending ? <ButtonLoader /> : t("continue")}
        </Button>
        <p className="text-center mt-5 font-light text-sm">
          {t("haveAccount")}{" "}
          <Link
            locale="en"
            href={`/sign-in/?userType=${type}`}
            className="font-bold text-sm text-greeny"
          >
            {t("signIn")}
          </Link>
        </p>
        {/* Social login options */}
        <div className="max-w-[360px] mt-12 mx-auto flex flex-col items-center gap-8">
          <div className="flex justify-between items-center w-full gap-4">
            <div className="w-full max-w-[146px] h-[1px] bg-white" />
            <span className="dark:text-white text-lg font-bold leading-5">
              {t("or")}
            </span>
            <div className="w-full max-w-[146px] h-[1px] bg-white" />
          </div>
          <div className="flex justify-between w-full max-w-[70px] mb-5">
            <AppleLogin type={type} />
            <GoogleLogin type={type} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
