"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { newPasswordAction } from "@/app/actions/authActions";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { Form } from "@/components/ui/form";
import PasswordInput from "@/components/ui/password-input";
import { useRouter } from "@/navigation";
import { newPasswordSchema } from "@/schema/authSchema";

interface NewPasswordProps {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

/**
 * NewPassword component that renders a form for setting a new password.
 *
 * @param {NewPasswordProps} props - The properties passed to the component.
 * @returns {JSX.Element} The new password component.
 *
 * @example
 * ```tsx
 * <NewPassword params={{ userType: "user" }} searchParams={{ phone: "1234567890", code: "1234" }} />
 * ```
 */
const NewPassword: React.FC<NewPasswordProps> = ({ params, searchParams }) => {
  const router = useRouter();
  const t = useTranslations("Index");

  // Initialize the form with validation schema and default values
  const form = useForm<newPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      new_password: "",
      new_password_confirmation: "",
    },
  });

  // Initialize the mutation for setting a new password
  const { mutate: server_newPasswordAction, isPending } = useMutation({
    mutationFn: newPasswordAction,
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
   * @param {newPasswordSchema} data - The form data.
   */
  const handleSubmit = async (data: newPasswordSchema) => {
    server_newPasswordAction({
      newPasswordData: data,
      phone: searchParams.phone as string,
      code: searchParams.code as string,
      type: params.userType,
    });
  };

  return (
    <div className="md:w-[360px] flex flex-col justify-center items-center gap-8 px-3 md:px-14 py-16 rounded-[40px] bg-black/15 shadow-lg backdrop-blur-lg text-white">
      <h2>{t("verificationCode")}</h2>
      <Form {...form}>
        <form
          className="w-full mt-6 md:px-0 flex flex-col gap-9 items-center"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <PasswordInput
            name="new_password"
            label={t("newPassword")}
            control={form.control}
            className=""
          />
          <PasswordInput
            name="new_password_confirmation"
            label={t("confirmNewPassword")}
            control={form.control}
            className=""
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

export default NewPassword;
