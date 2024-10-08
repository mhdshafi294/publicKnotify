"use client";

import { assignPaymentAction } from "@/app/actions/profileActions";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { BanknoteIcon } from "lucide-react";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "sonner";

type PayButtonProps = {
  disabled?: boolean;
  session?: Session;
};

/**
 * Functional component for a payment button in a React application.
 * @param {PayButtonProps} disabled - Flag to disable the button.
 * @param {PayButtonProps} session - Session information for the payment.
 * @returns A button component for initiating a payment action.
 */
const AssignPayButton: React.FC<PayButtonProps> = ({ disabled, session }) => {
  const t = useTranslations("Index");

  const { mutate: server_assignPaymentAction, isPending } = useMutation({
    mutationFn: assignPaymentAction,
    onMutate: () => {
      toast.loading(t("processing"));
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(t("confirmed"));
      if (data) {
        window.open(data, "_blank"); // Open the URL in a new tab
      } else {
        console.error("No URL found in the response data");
      }
    },
    onError: () => {
      toast.error(t("errorTryAgain"));
    },
  });

  const handlePayment = () => {
    server_assignPaymentAction({ type: "podcaster" });
  };

  return (
    <Button
      variant="default"
      className="w-full text-xl gap-2 items-center font-bold bg-foreground text-background hover:bg-background hover:text-foreground"
      size="lg"
      disabled={isPending || disabled}
      onClick={handlePayment}
    >
      {t("payment")}
      <BanknoteIcon />
    </Button>
  );
};

export default AssignPayButton;
