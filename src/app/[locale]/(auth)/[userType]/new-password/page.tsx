"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { newPasswordSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/navigation";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import PasswordInput from "@/components/ui/password-input";
import { useMutation } from "@tanstack/react-query";
import { newPasswordAction } from "@/app/actions/authActions";

const NewPassword = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const t = useTranslations("Auth");

  const form = useForm<newPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const {
    data,
    mutate: server_newPasswordAction,
    isPending,
  } = useMutation({
    mutationFn: newPasswordAction,
    onSuccess: () => {
      router.push(`/sign-in?userType=${params.userType}`);
    },
    onError: () => {
      toast.error(t("errorTryAgain"));
    },
  });

  const handleSubmit = async (data: newPasswordSchema) => {
    server_newPasswordAction({
      newPasswordData: data,
      phone: searchParams.phone as string,
      code: searchParams.code as string,
      type: params.userType,
    });
  };

  return (
    <div className="md:w-[360px] min-h-screen flex flex-col justify-center items-center gap-8">
      <h2>{t("verificationCode")}</h2>
      <Form {...form}>
        <form
          className="w-full mt-6 md:px-0 flex flex-col gap-9 items-center"
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
        >
          <PasswordInput
            name={"new_password"}
            label={t("newPassword")}
            control={form.control}
            className=""
          />
          <PasswordInput
            name={"new_password_confirmation"}
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
