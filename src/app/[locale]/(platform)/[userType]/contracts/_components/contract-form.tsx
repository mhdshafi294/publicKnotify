"use client";

import {
  createContractAction,
  getContractAction,
  updateContractAction,
} from "@/app/actions/contractActions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { cn, getDirection } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { ContractSchema } from "@/schema/contractSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
import ContractPageCard from "./contract-page-card";
import { getRequestAction } from "@/app/actions/requestsActions";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import ContractFormHeader from "./contract-form-header";
import { Card, CardContent } from "@/components/ui/card";
import SelectFormInput from "@/components/ui/select-form-input";
import FormInputRichText from "@/components/ui/form-input-rich-text";
import SelectRequest from "@/components/select-request";
import TimePicker from "@/components/ui/time-picker";
import DatePicker from "@/components/ui/date-picker";
import DurationPickerFormInput from "@/components/ui/duration-picker-form-input";
import PricePickerFormInput from "@/components/ui/price-picker-form-input";

type ContractFormProps = {
  contract_id?: string;
};

const ContractForm: React.FC<ContractFormProps> = ({ contract_id }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("Index");
  const locale = useLocale();
  const dir = getDirection(locale);
  const [step, setStep] = useState<number>(1);
  // State to track if the component has mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && session?.user?.type !== "podcaster") {
      router.push(`/${session?.user?.type}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, session]);

  const searchParams = useSearchParams();

  // Initialize form with default values and validation schema
  const form = useForm<ContractSchema>({
    resolver: zodResolver(ContractSchema),
    defaultValues: {
      company_request_id: "",
      media_type: "audio",
      episode_type: "full",
      ad_place: "first",
      ad_period: "00:01:00",
      ad_cost: "10.00",
      publishing_date: new Date(),
      publishing_time: "16:11",
      description: "",
    },
  });

  // Fetch request draft data
  const {
    data: requestResponse,
    isPending: isRequestPending,
    isError: isRequestError,
  } = useQuery({
    queryKey: [
      "selected_contract_request",
      form.getValues("company_request_id"),
    ],
    queryFn: () =>
      getRequestAction({
        id: form.getValues("company_request_id"),
        type: "podcaster",
      }),
    enabled: !!form.getValues("company_request_id") && isMounted,
  });

  const {
    data: contractResponseData,
    isPending: isContractPending,
    isError: isContractError,
  } = useQuery({
    queryKey: ["contract_to_edit", contract_id],
    queryFn: () =>
      getContractAction({
        id: contract_id!,
        type: "podcaster",
      }),
    enabled: !!contract_id && isMounted,
  });

  // Reset form with draft data
  useEffect(() => {
    if (contractResponseData) {
      form.reset({
        company_request_id: contractResponseData.request_name,
        media_type: contractResponseData.media_type as "audio" | "video",
        episode_type: contractResponseData.episode_type_translation as
          | "full"
          | "bonus"
          | "trailer",
        ad_place: contractResponseData.ad_place as
          | "video"
          | "middle"
          | "end"
          | "first",
        ad_period: contractResponseData.ad_period,
        ad_cost: contractResponseData.ad_cost,
        publishing_date: new Date(contractResponseData.publishing_date!),
        publishing_time: contractResponseData.publishing_time?.slice(0, 5),
        description: contractResponseData.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract_id, contractResponseData]);

  // Mutation for creating metadata
  const {
    data: createMetadataResponse,
    mutate: server_createContractAction,
    isPending: isPendingCreateMetadata,
    error: errorCreateMetadata,
  } = useMutation({
    mutationFn: createContractAction,
    onMutate: () => {
      toast.loading(t("creatingContract"));
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(t("contractCreated"));
      router.push(`/${session?.user?.type}/contracts`);
    },
    onError: (error) => {
      toast.dismiss();
      if (error.message.includes("422")) toast.error(t("draftAlreadyError"));
      else toast.error(t("somethingWentWrong"));
    },
  });

  // Mutation for updating metadata
  const {
    mutate: server_updateContractAction,
    isPending: isPendingUpdateMetadata,
    error: errorUpdateMetadata,
  } = useMutation({
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
      console.error(errorUpdateMetadata);
    },
  });

  /**
   * Handle form submission to create or update podcast metadata.
   *
   * @param {ContractSchema} data - The form data.
   */
  const handleSubmit = async (data: ContractSchema) => {
    try {
      // console.log(data);
      // Your form submission logic here
      const formData = new FormData();
      formData.append("media_type", data.media_type);
      formData.append(
        "episode_type",
        data.episode_type === "trailer"
          ? "3"
          : data.episode_type === "bonus"
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
        server_updateContractAction({
          formData,
          type: "podcaster",
          id: contract_id,
        });
      } else {
        formData.append("company_request_id", data.company_request_id);
        server_createContractAction({ formData, type: "podcaster" });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("Zod validation error:", error.errors);
      } else {
        console.error("Other error:", error);
      }
    }
  };

  const handleError = (errors: any) => {
    // console.log(showId, "<<<<<<<<<<showId");
    // console.log(form.getValues().play_list_id, "<<<<<<<<play_list_id");
    console.log("Validation Errors:", errors);
  };

  const secondPartyData = {
    name: requestResponse?.request?.company?.full_name!,
    image: requestResponse?.request?.company?.image!,
  };

  const content = () => {
    if (step === 1) {
      return (
        <Card className="bg-card-secondary duration-200 border-card-foreground/10 flex-1 relative flex flex-col p-4">
          <CardContent className="space-y-3">
            <div className="w-full flex justify-between gap-5 flex-col md:flex-row">
              <FormField
                control={form.control}
                disabled={contract_id ? true : false}
                name="company_request_id"
                render={({ field }) => (
                  <FormItem className="w-full" dir={dir}>
                    <FormLabel className="text-lg capitalize">
                      {t("podcaster")}
                    </FormLabel>
                    <SelectRequest
                      setValue={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PricePickerFormInput
                name="ad_cost"
                className="bg-background"
                FormItemClassName="w-full"
                label={t("cost")}
                control={form.control}
              />
            </div>
            <div className="w-full flex justify-between gap-5 flex-col md:flex-row">
              {/* Select input for the podcast media type (audio/video) */}
              <SelectFormInput
                name="media_type"
                placeholder={t("podcastMediaTypePlaceholder")}
                label={t("mediaTypeLabel")}
                control={form.control}
                options={["audio", "video"]}
              />
              {/* Select input for the podcast type (full/bonus/trailer) */}
              <SelectFormInput
                name="episode_type"
                placeholder={t("episodeTypePlaceholder")}
                label={t("episodeTypeLabel")}
                control={form.control}
                options={["full", "bonus", "trailer"]}
              />
            </div>
            <div className="w-full flex justify-between gap-5 flex-col md:flex-row">
              {/* Select input for the podcast type (full/bonus/trailer) */}
              <SelectFormInput
                name="ad_place"
                placeholder={t("episodeTypePlaceholder")}
                label={t("episodeTypeLabel")}
                control={form.control}
                options={["first", "middle", "end", "video"]}
              />
              <DurationPickerFormInput
                name="ad_period"
                className="bg-background"
                FormItemClassName="w-full"
                label={t("period")}
                control={form.control}
              />
            </div>
            <div className="w-full flex justify-between gap-5 items-start flex-wrap">
              <DatePicker
                className="flex-1"
                name="publishing_date"
                label={t("dateLabel")}
                control={form.control}
              />
              <TimePicker
                className="flex-1"
                name="publishing_time"
                label={t("timeLabel")}
                control={form.control}
              />
            </div>
            {/* Textarea input for the podcast summary */}
            <FormInputRichText
              name="description"
              label={t("description")}
              control={form.control}
            />
          </CardContent>
        </Card>
      );
    } else if (step === 2 && !!requestResponse) {
      return (
        <div className="py-5 flex-1 flex flex-col">
          <ContractPageCard
            request_name={requestResponse?.request?.name!}
            secondPartyData={secondPartyData}
            description={form.watch("description")}
            media_type={form.watch("media_type")}
            ad_place={form.watch("episode_type")}
            ad_period={form.watch("ad_period")}
            ad_cost={form.watch("ad_cost")}
            publishing_date={format(
              form.watch("publishing_date"),
              "yyyy-MM-dd"
            )}
            publishing_time={form.watch("publishing_time")}
            episode_type_translation={form.watch("episode_type")}
            session={session!}
          />
        </div>
      );
    }
  };

  if (!isMounted) return null;

  console.log(requestResponse?.request);

  return (
    <MaxWidthContainer>
      {" "}
      <main className="flex flex-col flex-1 items-center justify-start gap-6 w-full min-h-[calc(100vh_-_112px)]">
        <Form {...form}>
          <form
            className="w-full h-full flex flex-col flex-1 px-0"
            onSubmit={form.handleSubmit(handleSubmit, handleError)}
          >
            <ContractFormHeader
              isPending={isPendingUpdateMetadata || isPendingCreateMetadata}
              isRequestCreated={!requestResponse}
              step={step}
              setStep={setStep}
            />
            {content()}
          </form>
        </Form>
      </main>
    </MaxWidthContainer>
  );
};

export default ContractForm;
