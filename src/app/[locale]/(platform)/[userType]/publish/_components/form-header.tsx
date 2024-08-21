"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

import ButtonLoader from "@/components/ui/button-loader";
import { cn } from "@/lib/utils";
import PublishButton from "./publish-button";
import { useRouter } from "@/navigation";
import { useSession } from "next-auth/react";

type FormHeaderProps = {
  step: number;
  setStep: (step: number) => void;
  isPending: boolean;
  onContinue?: () => void;
  onSave?: () => void;
  onBack: () => void;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  podcast_id: string | null;
  selectedPlatforms: string[];
  isPublished: boolean;
  uploadedNewPodcast: boolean;
  t: (key: string) => string;
};

/**
 * FormHeader component renders the header for the form with navigation and action buttons.
 *
 * @param {FormHeaderProps} props - The properties passed to the component.
 * @returns {JSX.Element} The FormHeader component.
 *
 * @example
 * ```tsx
 * <FormHeader
 *   step={1}
 *   setStep={setStep}
 *   isPending={isPending}
 *   onContinue={handleContinue}
 *   onSave={handleSave}
 *   onBack={handleBack}
 *   isShow={isShow}
 *   setIsShow={setIsShow}
 *   podcast_id={podcast_id}
 *   selectedPlatforms={selectedPlatforms}
 *   isPublished={isPublished}
 *   uploadedNewPodcast={uploadedNewPodcast}
 *   t={t}
 * />
 * ```
 */
const FormHeader: React.FC<FormHeaderProps> = ({
  step,
  setStep,
  isPending,
  onContinue,
  onSave,
  onBack,
  isShow,
  setIsShow,
  podcast_id,
  selectedPlatforms,
  isPublished,
  uploadedNewPodcast,
  t,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col justify-between lg:justify-center items-start">
        <h1 className="text-xl font-bold">{t("podcastDraftLabel")}</h1>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          className="capitalize text-sm lg:hidden"
          variant="secondary"
          onClick={() => setIsShow(!isShow)}
          type="button"
        >
          {t("draftsButton")}
        </Button>
        <Button
          disabled={isPending}
          className={cn("capitalize mt-0 text-sm", { hidden: step === 2 })}
          variant="secondary"
          type="button"
          onClick={() => {
            router.push(`/profile/${session?.user?.id}`);
          }}
        >
          {isPending ? <ButtonLoader /> : t("cancel")}
        </Button>
        <Button
          disabled={isPending}
          className={cn("capitalize mt-0 text-sm", { hidden: step === 2 })}
          variant="default"
          type="submit"
        >
          {isPending ? <ButtonLoader /> : t("saveButton")}
        </Button>
        <Button
          disabled={isPending}
          className={cn("capitalize mt-0 text-sm", { hidden: step === 1 })}
          variant="secondary"
          type="button"
          onClick={onBack}
        >
          {t("backButton")}
        </Button>
        <Button
          disabled={isPending}
          className={cn("capitalize mt-0 text-sm", { hidden: step === 1 })}
          variant="outline"
          type="submit"
        >
          <SaveIcon className="size-4 me-1.5" strokeWidth={1.5} />
          {isPending ? <ButtonLoader /> : t("saveButton")}
        </Button>
        <PublishButton
          className={cn({ hidden: step === 1 })}
          podcast_id={podcast_id!}
          disabled={isPublished || !podcast_id || !uploadedNewPodcast}
          selectedPlatform={selectedPlatforms}
        />
      </div>
    </div>
  );
};

export default FormHeader;
