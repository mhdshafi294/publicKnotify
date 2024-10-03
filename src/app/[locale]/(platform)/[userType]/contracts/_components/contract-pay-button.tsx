"use client";

import { contractPaymentAction } from "@/app/actions/contractActions";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { BanknoteIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "sonner";
import { Session } from "next-auth";

type PayButtonProps = {
  contractId: number;
  disabled?: boolean;
  session?: Session;
};

const ContractPayButton: React.FC<PayButtonProps> = ({
  contractId,
  disabled,
  session,
}) => {
  const t = useTranslations("Index");

  const { mutate: server_sendCodeAction, isPending } = useMutation({
    mutationFn: contractPaymentAction,
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
    server_sendCodeAction({ type: "company", id: contractId.toString() });
  };

  return (
    <Button
      variant="default"
      className="text-xl gap-2 items-center font-bold bg-foreground text-background hover:bg-background hover:text-foreground"
      size="lg"
      disabled={isPending || disabled}
      onClick={handlePayment}
    >
      {t("payment")}
      <BanknoteIcon />
    </Button>
  );
};

export default ContractPayButton;
