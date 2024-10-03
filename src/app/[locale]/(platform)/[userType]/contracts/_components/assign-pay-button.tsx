"use client";

import { contractPaymentAction } from "@/app/actions/contractActions";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { BanknoteIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "sonner";
import { Session } from "next-auth";
import { assignPaymentAction } from "@/app/actions/profileActions";

type PayButtonProps = {
  disabled?: boolean;
  session?: Session;
};

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
