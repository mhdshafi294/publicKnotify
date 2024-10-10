"use client";

import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";

import { createRequestAction } from "@/app/actions/requestsActions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { Form } from "@/components/ui/form";
import { useRouter } from "@/navigation";
import { createRequestSchema } from "@/schema/requestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPodcasterAction } from "@/app/actions/podcasterActions";
import { useSearchParams } from "next/navigation";
import { getDirection } from "@/lib/utils";
import AddPositionAndChannelsCard from "./_components/add-position-and-channels-card";
import MainFormBodyCard from "./_components/main-form-body-card";

/**
 * CreateRequest Component
 * Form for creating a new request with various input fields and validations.
 * Handles form submission and redirects upon success.
 *
 * @returns {JSX.Element} The form for creating a request.
 */
const CreateRequest = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("Index");
  const locale = useLocale();
  const dir = getDirection(locale);

  // State to track if the component has mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (
      isMounted &&
      (session?.user?.type === "user" || session?.user?.type === "podcaster")
    ) {
      router.push(`/${session?.user?.type}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, session]);

  const searchParams = useSearchParams();

  // Initialize form with default values and validation schema
  const form = useForm<createRequestSchema>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      name: "",
      summary: "",
      type: "audio",
      publishing_date: new Date(),
      publishing_time: "16:11",
      company_tag: "",
      thumbnail: new File([], ""),
      background: new File([], ""),
      categories: [],
      hashtags: [],
      ad_period: "00:00",
      ad_place: "first",
      podcaster_id:
        typeof searchParams.get("podcasterId") === "string"
          ? (searchParams.get("podcasterId") as string)
          : "",
      publish_youtube: "0",
      publish_spotify: "0",
    },
  });

  const podcasterId = form.watch("podcaster_id");

  const {
    data: podcasterResponse,
    isPending: ispodcasterPending,
    isError: ispodcasterError,
    refetch: refetchPodcaster,
  } = useQuery({
    queryKey: ["podcasterRequest"],
    queryFn: () =>
      getPodcasterAction({ id: podcasterId, type: session?.user?.type! }),
    enabled: !!podcasterId,
  });

  useEffect(() => {
    if (podcasterId) {
      refetchPodcaster();
    }
  }, [podcasterId, refetchPodcaster]);

  const podcaster = podcasterResponse?.podcaster;

  const {
    mutate: server_createRequestAction,
    isPending,
    error,
  } = useMutation({
    mutationFn: createRequestAction,
    onMutate: () => {
      toast.loading(t("creatingRequest"));
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(t("requestCreatedSuccessfully"));
      router.push(`/company/requests`);
    },
    onError: () => {
      toast.dismiss();
      toast.error(t("somethingWentWrong"));
      console.log(error);
    },
  });

  const handleSubmit = async (data: createRequestSchema) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("summary", data.summary);
    formData.append("type", data.type);
    formData.append(
      "publishing_date",
      format(data.publishing_date, "yyyy-MM-dd")
    );
    formData.append("publishing_time", data.publishing_time);
    formData.append("company_tag", data.company_tag);
    formData.append("thumbnail", data.thumbnail);
    if (data.background) formData.append("background", data.background);
    data.categories.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });
    data.hashtags.forEach((hashtag, index) => {
      formData.append(`hashtags[${index}]`, hashtag);
    });
    formData.append("ad_period", data.ad_period);
    formData.append("ad_place", data.ad_place);
    formData.append("podcaster_id", data.podcaster_id);
    formData.append("publish_youtube", data.publish_youtube);
    formData.append("publish_spotify", data.publish_spotify);

    server_createRequestAction({ formData, type: "company" });
  };

  // Render nothing until the component has mounted
  if (!isMounted) return null;

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 w-full mt-10">
      <Form {...form}>
        <form
          className="w-full px-0"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <MaxWidthContainer className="flex flex-col-reverse gap-5 lg:grid lg:grid-cols-12 justify-items-stretch content-stretch items-stretch">
            <div className="lg:col-span-3 lg:me-10 lg:h-full">
              <AddPositionAndChannelsCard
                podcaster={podcaster}
                isPending={isPending}
              />
            </div>
            <div className="lg:col-span-9 space-y-5">
              <div className="w-full flex justify-between">
                <h1 className="text-xl font-bold">{t("createRequest")}</h1>
                <Button
                  disabled={isPending}
                  className="capitalize mt-0 font-bold"
                  type="submit"
                >
                  {isPending ? <ButtonLoader /> : t("continue")}
                </Button>
              </div>
              <MainFormBodyCard />
            </div>
          </MaxWidthContainer>
        </form>
      </Form>
    </main>
  );
};

export default CreateRequest;
