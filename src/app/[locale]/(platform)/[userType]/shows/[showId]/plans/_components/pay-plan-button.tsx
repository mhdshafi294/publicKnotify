"use client";

import { payPlanAction } from "@/app/actions/planActions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "sonner";

type PayPlanButtonProps = {
  disabled?: boolean;
  session?: Session;
  playlist_id: string;
  plan_id: string;
  is_special?: boolean;
};

/**
 * Functional component for a payment button in a React application.
 * @param {PayPlanButtonProps} disabled - Flag to disable the button.
 * @param {PayPlanButtonProps} session - Session information for the payment.
 * @returns A button component for initiating a payment action.
 */
const PayPlanButton: React.FC<PayPlanButtonProps> = ({
  disabled,
  session,
  playlist_id,
  plan_id,
  is_special,
}) => {
  const t = useTranslations("Index");

  const { mutate: server_payPlanAction, isPending } = useMutation({
    mutationFn: payPlanAction,
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
    server_payPlanAction({
      type: session?.user?.type as string,
      playlist_id,
      plan_id,
    });
  };

  return (
    <Button
      variant={is_special ? "default" : "outline"}
      className={cn(
        "w-full text-xl gap-2 items-center font-bold  rounded-full",
        { "bg-[#1ED760] hover:bg-[#1ED760]/90": is_special }
      )}
      size="lg"
      disabled={isPending || disabled}
      onClick={handlePayment}
    >
      {t("subsicribe")}
    </Button>
  );
};

export default PayPlanButton;
