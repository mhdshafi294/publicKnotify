"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPasswordSchema } from "@/schema/authSchema";
import { useRouter } from "@/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import PhoneNumberInput from "@/components/phone-number-input";
import { sendCodeAction } from "@/app/actions/authActions";

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
        `/${params.userType}/check-code?&phone=${phone?.code}${phone?.phone}`
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
    <div className="md:w-[360px] min-h-screen flex flex-col justify-center items-center gap-8">
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
            className="md:w-[360px] capitalize mx-auto mt-14"
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
