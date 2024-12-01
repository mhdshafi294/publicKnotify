"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { sendCodeAction } from "@/app/actions/authActions";
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
import { useRouter } from "@/navigation";
import { forgotPasswordSchema } from "@/schema/authSchema";

interface ForgotPasswordProps {
  params: { userType: string };
}

/**
 * ForgotPassword component that renders a form for entering a phone number to reset the password.
 *
 * @param {ForgotPasswordProps} props - The properties passed to the component.
 * @returns {JSX.Element} The forgot password component.
 *
 * @example
 * ```tsx
 * <ForgotPassword params={{ userType: "user" }} />
 * ```
 */
const ForgotPassword: React.FC<ForgotPasswordProps> = ({ params }) => {
  const router = useRouter();
  const t = useTranslations("Index");

  // Initialize the form with validation schema and default values
  const form = useForm<forgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: {
        code: "",
        phone: "",
      },
    },
  });

  // Use `watch` instead of `getValues` to dynamically watch the phone field
  const phone = form.watch("phone");

  // Initialize the mutation for sending the code
  const { mutate: server_sendCodeAction, isPending } = useMutation({
    mutationFn: sendCodeAction,
    onSuccess: () => {
      toast.success(t("confirmed"));
      router.push(
        `/${params.userType}/check-code?phone_code=${phone.code}&phone=${phone.phone}`
      );
    },
    onError: () => {
      toast.error(t("errorTryAgain"));
    },
  });

  /**
   * Handles form submission.
   *
   * @param {forgotPasswordSchema} data - The form data.
   */
  const handleSubmit = async (data: forgotPasswordSchema) => {
    server_sendCodeAction({ body: data, type: params.userType });
  };

  return (
    <div className="md:w-[360px] flex flex-col justify-center items-center gap-8 px-3 md:px-14 py-16 rounded-[40px] bg-black/15 shadow-lg backdrop-blur-lg text-white">
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
            className="w-full capitalize mx-auto mt-14"
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
