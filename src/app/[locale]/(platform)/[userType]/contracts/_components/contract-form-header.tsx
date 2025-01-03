"use client";

import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { cn } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { SaveIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";

type ContractFormHeaderProps = {
  isPending: boolean;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  isRequestReady: boolean;
  isUpdate: boolean;
};

/**
 * Functional component for the header of a contract form.
 * @param {ContractFormHeaderProps} props - The props for the component.
 * @param {boolean} props.isPending - Flag indicating if the form submission is pending.
 * @param {number} props.step - The current step of the form.
 * @param {function} props.setStep - Function to set the step of the form.
 * @param {boolean} props.isRequestReady - Flag indicating if the request is ready.
 * @param {boolean} props.isUpdate - Flag indicating if the form is for updating.
 * @returns JSX element representing the header of the contract form.
 */
const ContractFormHeader: React.FC<ContractFormHeaderProps> = ({
  isPending,
  step,
  setStep,
  isRequestReady,
  isUpdate,
}) => {
  const router = useRouter();
  const form = useFormContext();
  const t = useTranslations("Index");

  return (
    <div className="flex items-center justify-between w-full mb-3">
      <div className="flex flex-col justify-between lg:justify-center items-start">
        <h1 className="text-2xl font-bold">{t("contract-draft")}</h1>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          disabled={isPending}
          className={cn("capitalize mt-0 text-sm", {
            hidden: step === 2,
          })}
          size="lg"
          variant="outline"
          type="button"
          onClick={() => {
            router.push(`/contracts`);
          }}
        >
          {t("cancel")}
        </Button>
        <Button
          disabled={isPending || (!isRequestReady && !isUpdate)}
          className={cn("capitalize mt-0 text-sm", {
            hidden: step === 2,
          })}
          size="lg"
          variant="default"
          type="button"
          onClick={async () => {
            const isValid = await form.trigger(); // Validate the form
            if (isValid) {
              setStep(2); // If the form is valid, proceed to step 2
            }
          }}
        >
          {isPending ? <ButtonLoader /> : t("preview")}
        </Button>
        <Button
          disabled={isPending}
          className={cn("capitalize mt-0 text-sm", {
            hidden: step === 1,
          })}
          size="lg"
          variant="secondary"
          type="button"
          onClick={() => setStep(1)}
        >
          {t("backButton")}
        </Button>
        <Button
          disabled={isPending}
          className={cn("capitalize mt-0 text-sm", {
            hidden: step === 1,
          })}
          size="lg"
          variant="outline"
          type="submit"
        >
          <SaveIcon className="size-4 me-1.5" strokeWidth={1.5} />
          {isPending ? <ButtonLoader /> : t("saveButton")}
        </Button>
      </div>
    </div>
  );
};

export default ContractFormHeader;
