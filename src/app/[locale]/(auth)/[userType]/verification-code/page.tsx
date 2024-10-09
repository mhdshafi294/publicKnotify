"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkCodeSchema, forgotPasswordSchema } from "@/schema/authSchema";
import { useRouter } from "@/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import {
  confirmVerificationCodeAction,
  sendCodeAction,
} from "@/app/actions/authActions";

interface VerificationCodeProps {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * VerificationCode component that renders a form for entering an OTP code for verification.
 *
 * @param {VerificationCodeProps} props - The properties passed to the component.
 * @returns {JSX.Element} The OTP code verification component.
 *
 * @example
 * ```tsx
 * <VerificationCode params={{ userType: "user" }} searchParams={{ phone: "1234567890" }} />
 * ```
 */
const VerificationCode: React.FC<VerificationCodeProps> = ({
  params,
  searchParams,
}) => {
  const router = useRouter();
  const t = useTranslations("Index");

  // Initialize the form with validation schema and default values
  const form = useForm<checkCodeSchema>({
    resolver: zodResolver(checkCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  // Initialize the mutation for confirming the OTP code
  const { mutate: server_confirmVerificationCodeAction, isPending } =
    useMutation({
      mutationFn: confirmVerificationCodeAction,
      onSuccess: () => {
        router.push(`/sign-in?userType=${params.userType}`);
      },
      onError: () => {
        toast.error(t("errorTryAgain"));
      },
    });

  /**
   * Handles form submission.
   *
   * @param {checkCodeSchema} data - The form data.
   */
  const handleSubmit = async (data: checkCodeSchema) => {
    server_confirmVerificationCodeAction({
      code: data.code,
      phone: searchParams.phone as string,
      type: params.userType,
    });
  };

  // Initialize the mutation for sending the code
  const { mutate: server_sendCodeAction, isPending: isSendCodeActionPending } =
    useMutation({
      mutationFn: sendCodeAction,
      onSuccess: () => {
        toast.success("new verification code sent");
      },
      onError: () => {
        toast.error(t("errorTryAgain"));
      },
    });

  /**
   * Send new code.
   *
   * @param {forgotPasswordSchema} data - The form data.
   */
  const sendNewCode = async (data: forgotPasswordSchema) => {
    server_sendCodeAction({ body: data, type: params.userType });
  };

  return (
    <div className="md:max-w-[752px] min-h-screen flex flex-col justify-center items-center gap-8">
      <h2>{t("verificationCode")}</h2>
      <Form {...form}>
        <form
          className="w-full mt-6 md:px-0 flex flex-col items-center"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-center gap-16">
                <FormLabel>{t("verificationCodeSent")}</FormLabel>
                <FormControl>
                  <InputOTP maxLength={4} {...field} containerClassName="gap-6">
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            className="w-[264px] capitalize mx-auto mt-20"
            type="submit"
          >
            {isPending ? <ButtonLoader /> : t("confirm")}
          </Button>
        </form>
      </Form>
      <Button
        disabled={
          isSendCodeActionPending ||
          !searchParams.phone_code ||
          !searchParams.phone
        }
        variant="link"
        className="capitalize text-greeny"
        type="button"
        onClick={() =>
          sendNewCode({
            phone: {
              code: searchParams.phone_code as string,
              phone: searchParams.phone as string,
            },
          })
        }
      >
        {isSendCodeActionPending ? <ButtonLoader /> : t("re-send-code")}
      </Button>
    </div>
  );
};

export default VerificationCode;
