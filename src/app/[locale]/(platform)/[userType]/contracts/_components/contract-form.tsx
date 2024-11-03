"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "@/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations, useLocale } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ContractSchema } from "@/schema/contractSchema";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { getDirection } from "@/lib/utils";
import { toast } from "sonner";
import ContractFormHeader from "./contract-form-header";
import {
  getContractAction,
  createContractAction,
  updateContractAction,
} from "@/app/actions/contractActions";
import { getRequestAction } from "@/app/actions/requestsActions";
import StepFormContent from "./step-form-content";
import { Form } from "@/components/ui/form";

interface ContractFormProps {
  contract_id?: string;
}

/**
 * Functional component for rendering a contract form.
 * @param {ContractFormProps} contract_id - The props for the contract form component.
 * @returns JSX element for the contract form.
 */
const ContractForm: React.FC<ContractFormProps> = ({ contract_id }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const t = useTranslations("Index");
  const locale = useLocale();
  const dir = getDirection(locale);
  const [step, setStep] = useState<number>(1);
  const [isMounted, setIsMounted] = useState(false);
  const [state, setState] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<ContractSchema>({
    resolver: zodResolver(ContractSchema),
    defaultValues: {
      company_request_id: "",
      media_type: "audio",
      episode_type: "Full",
      ad_place: "first",
      ad_period: "00:00",
      ad_cost: "10.00",
      publishing_date: new Date(),
      publishing_time: "16:11",
      description: "",
    },
  });

  // Fetch contract data to edit
  const { data: contractResponseData } = useQuery({
    queryKey: ["contract_to_edit", contract_id],
    queryFn: () =>
      getContractAction({
        id: contract_id!,
        type: "podcaster",
      }),
    enabled: !!contract_id && isMounted,
  });

  // Fetch request data
  const { data: requestResponse, isLoading: isRequestPending } = useQuery({
    queryKey: [
      "selected_contract_request",
      form.getValues("company_request_id"),
    ],
    queryFn: () =>
      getRequestAction({
        id: form.getValues("company_request_id")
          ? form.getValues("company_request_id")!
          : contractResponseData?.request_id.toString()!,
        type: "podcaster",
      }),
    enabled:
      (!!form.getValues("company_request_id") ||
        !!contractResponseData?.request_id.toString()) &&
      isMounted,
  });

  useEffect(() => {
    if (contractResponseData) {
      form.reset({
        company_request_id: contractResponseData.request_id.toString(),
        media_type: contractResponseData.media_type,
        episode_type: contractResponseData.episode_type_translation,
        ad_place: contractResponseData.ad_place,
        ad_period: contractResponseData.ad_period,
        ad_cost: contractResponseData.ad_cost,
        publishing_date: new Date(contractResponseData.publishing_date!),
        publishing_time: contractResponseData.publishing_time?.slice(0, 5),
        description: contractResponseData.description,
      });
      setState(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractResponseData]);

  // Mutation for creating contract
  const { mutate: createContract, isPending: isPendingCreateMetadata } =
    useMutation({
      mutationFn: createContractAction,
      onMutate: () => {
        toast.loading(t("creatingContract"));
      },
      onSuccess: () => {
        toast.dismiss();
        toast.success(t("contractCreated"));
        router.push(`/${session?.user?.type}/contracts`);
      },
      onError: (error: any) => {
        toast.dismiss();
        if (error.message.includes("422")) toast.error(t("draftAlreadyError"));
        else toast.error(t("somethingWentWrong"));
      },
    });

  // Mutation for updating contract
  const { mutate: updateContract, isPending: isPendingUpdateMetadata } =
    useMutation({
      mutationFn: updateContractAction,
      onMutate: () => {
        toast.loading(t("updatingContract"));
      },
      onSuccess: () => {
        toast.dismiss();
        toast.success(t("contractUpdated"));
        setStep(2);
      },
      onError: () => {
        toast.dismiss();
        toast.error(t("somethingWentWrong"));
      },
    });

  const handleSubmit = async (data: ContractSchema) => {
    if (contractResponseData && contractResponseData.status !== 1) {
      toast.error(t("contract-can-not-be-edited-after-accepted-by-admin"));
      return;
    }
    try {
      const formData = new FormData();
      formData.append("media_type", data.media_type);
      formData.append(
        "episode_type",
        data.episode_type === "Trailer"
          ? "3"
          : data.episode_type === "Bonus"
          ? "2"
          : "1"
      );
      formData.append("ad_place", data.ad_place);
      formData.append("ad_period", data.ad_period);
      formData.append("ad_cost", data.ad_cost);
      if (data.publishing_date) {
        formData.append(
          "publishing_date",
          format(data.publishing_date, "yyyy-MM-dd")
        );
      }
      if (data.publishing_time) {
        formData.append("publishing_time", data.publishing_time);
      }
      formData.append("description", data.description);

      if (contract_id) {
        formData.append("_method", "put");
        updateContract({
          formData,
          type: "podcaster",
          id: contract_id,
        });
      } else {
        formData.append("company_request_id", data.company_request_id!);

        createContract({ formData, type: "podcaster" });
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  if (!isMounted) return null;

  return (
    <MaxWidthContainer>
      <main className="flex flex-col flex-1 items-center justify-start gap-6 w-full min-h-[calc(100vh_-_112px)] py-10">
        <Form {...form}>
          <form
            className="w-full h-full flex flex-col flex-1 px-0"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <ContractFormHeader
              isPending={isPendingUpdateMetadata || isPendingCreateMetadata}
              isRequestReady={!!requestResponse}
              isUpdate={!!contract_id}
              step={step}
              setStep={setStep}
            />
            <StepFormContent
              step={step}
              state={state}
              form={form}
              contract_id={contract_id}
              dir={dir}
              requestResponse={requestResponse}
              secondPartyData={{
                name: requestResponse?.request?.company?.full_name!,
                image: requestResponse?.request?.company?.image!,
              }}
              session={session!}
            />
          </form>
        </Form>
      </main>
    </MaxWidthContainer>
  );
};

export default ContractForm;
