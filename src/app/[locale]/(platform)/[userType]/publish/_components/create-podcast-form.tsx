"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

// Local imports
import { getDirection } from "@/lib/utils";
import { createMetadataSchema } from "@/schema/createMetadataSchema";
import {
  createMetadataAction,
  getSelfPodcastAction,
  updateMetadataAction,
} from "@/app/actions/podcastActions";
import { getRequestAction } from "@/app/actions/requestsActions";
import { SelfPodcastDetails } from "@/types/podcast";
import { RequestDetails } from "@/types/request";
import { Form } from "@/components/ui/form";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import FormHeader from "./form-header";
import FormSection from "./form-section";

// Type definition for the component props
type CreatePodcastFormProps = {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * CreatePodcastForm component that handles the creation and editing of podcast metadata.
 *
 * @param {CreatePodcastFormProps} props - The properties passed to the component.
 * @returns {JSX.Element} The Create Podcast Form component.
 *
 * @example
 * ```tsx
 * <CreatePodcastForm setIsShow={setIsShow} />
 * ```
 */
const CreatePodcastForm: React.FC<CreatePodcastFormProps> = ({ setIsShow }) => {
  // Initialize hooks
  const { data: session } = useSession();
  const t = useTranslations("Index");
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const dir = getDirection(locale);

  // State variables
  const [isMounted, setIsMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [addToPlayList, setAddToPlayList] = useState(false);
  const [uploadedNewPodcast, setUploadedNewPodcast] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["web"]);
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<
    SelfPodcastDetails | RequestDetails | null
  >(null);
  const [isShowState, setIsShowState] = useState<boolean>(false); // Initialize isShow state

  // Retrieve query parameters
  const request_id = searchParams.get("request_id");
  const podcast_id = searchParams.get("podcast_id");
  const params = new URLSearchParams(searchParams.toString());

  // Initialize form with default values and resolver
  const form = useForm<createMetadataSchema>({
    resolver: zodResolver(createMetadataSchema),
    defaultValues: {
      name: "",
      summary: "",
      type: "audio",
      publishing_date: new Date(),
      publishing_time: "16:11",
      company_tag: "",
      thumbnail: undefined,
      background: undefined,
      play_list_id: undefined,
      categories: [],
      hashtags: [],
      company_request_id: "",
      podcast_id: "",
      terms: true,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  let podcastType = form.watch("type");

  // Redirect if user type is not 'podcaster'
  useEffect(() => {
    if (
      isMounted &&
      (session?.user?.type === "user" || session?.user?.type === "company") &&
      !initialized
    ) {
      router.push(`/${session?.user?.type}`);
      setInitialized(true);
    }
  }, [isMounted, session, router, initialized]);

  // Fetch podcast draft data
  const {
    data: podcastResponse,
    isPending: isPodcastPending,
    isError: isPodcastError,
  } = useQuery({
    queryKey: ["podcast_draft", podcast_id],
    queryFn: () => getSelfPodcastAction({ id: podcast_id!, type: "podcaster" }),
    enabled: !!podcast_id && isMounted,
  });

  // Fetch request draft data
  const {
    data: requestResponse,
    isPending: isRequestPending,
    isError: isRequestError,
  } = useQuery({
    queryKey: ["podcast_draft", podcast_id],
    queryFn: () => getRequestAction({ id: request_id!, type: "podcaster" }),
    enabled: !!request_id && !podcast_id && isMounted,
  });

  // Redirect if the podcast is already published
  useEffect(() => {
    if (podcastResponse && podcastResponse?.podcast?.is_published) {
      router.push(`/${session?.user?.type}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podcastResponse]);

  // Set draft data based on response
  useEffect(() => {
    if (!isPodcastPending && !isPodcastError && podcastResponse?.podcast) {
      setDraft(podcastResponse?.podcast);
    } else if (
      !isRequestPending &&
      !isRequestError &&
      requestResponse?.request
    ) {
      setDraft(requestResponse?.request);
    }
  }, [
    isPodcastPending,
    isPodcastError,
    podcastResponse,
    isRequestPending,
    isRequestError,
    requestResponse,
  ]);

  // Reset form with draft data
  useEffect(() => {
    if (draft) {
      form.reset({
        name: draft.name!,
        summary: draft.summary!,
        type: draft.type!,
        publishing_date: new Date(draft.publishing_date!),
        publishing_time: draft.publishing_time?.slice(0, 5),
        company_tag: draft.company_tag!,
        categories: draft.categories.map((category) => category.id.toString()),
        hashtags: draft.hashTags.map((hashtag) => hashtag.name),
        thumbnail: podcastResponse?.podcast?.thumbnail
          ? podcastResponse?.podcast?.thumbnail
          : undefined,
        background: podcastResponse?.podcast?.background
          ? podcastResponse?.podcast?.background
          : undefined,
        company_request_id: request_id ? request_id : undefined,
        podcast_id: podcast_id ? podcast_id : undefined,
        terms: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [podcast_id, draft]);

  // Mutation for creating metadata
  const {
    data: createMetadataResponse,
    mutate: server_createMetadataAction,
    isPending: isPendingCreateMetadata,
    error: errorCreateMetadata,
  } = useMutation({
    mutationFn: createMetadataAction,
    onMutate: () => {
      toast.loading(t("creatingPodcastMetadata"));
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(t("podcastMetadataCreated"));
      params.set("podcast_id", data?.podcast_id!);
      setStep(2);
      queryClient.invalidateQueries({ queryKey: ["podcastsDrafts"] });
      router.push(`publish?${params.toString()}`);
    },
    onError: (error) => {
      toast.dismiss();
      if (error.message.includes("422")) toast.error(t("draftAlreadyError"));
      else toast.error(t("somethingWentWrong"));
    },
  });

  // Mutation for updating metadata
  const {
    mutate: server_updateMetadataAction,
    isPending: isPendingUpdateMetadata,
    error: errorUpdateMetadata,
  } = useMutation({
    mutationFn: updateMetadataAction,
    onMutate: () => {
      toast.loading(t("updatingPodcastMetadata"));
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(t("podcastMetadataUpdated"));
      queryClient.invalidateQueries({ queryKey: ["podcastsDrafts"] });
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
   * @param {createMetadataSchema} data - The form data.
   */
  const handleSubmit = async (data: createMetadataSchema) => {
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

    if (data.thumbnail instanceof File)
      formData.append("thumbnail", data.thumbnail);
    if (data.background instanceof File)
      formData.append("background", data.background);
    if (data.play_list_id) formData.append("playlist_id", data.play_list_id);

    data.categories.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });
    data.hashtags.forEach((hashtag, index) => {
      formData.append(`hashtags[${index}]`, hashtag);
    });

    if (request_id && !podcast_id)
      formData.append("company_request_id", request_id);
    if (podcast_id) {
      server_updateMetadataAction({
        formData,
        type: "podcaster",
        id: podcast_id,
      });
    } else {
      server_createMetadataAction({ formData, type: "podcaster" });
    }
  };

  if (!isMounted) return null;

  return (
    <main className="flex flex-col flex-1 items-center justify-start gap-6 w-full min-h-[calc(100vh_-_112px)]">
      <Form {...form}>
        <form
          className="w-full px-0"
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
        >
          <MaxWidthContainer className="flex flex-col-reverse gap-5 lg:grid lg:grid-cols-12 justify-items-stretch content-stretch items-stretch pb-3">
            <div className="space-y-5 lg:col-start-4 lg:col-span-9">
              <FormHeader
                step={step}
                setStep={setStep}
                isPending={isPendingUpdateMetadata || isPendingCreateMetadata}
                onBack={() => setStep(1)}
                isShow={isShowState}
                setIsShow={setIsShowState}
                podcast_id={podcast_id}
                selectedPlatforms={selectedPlatforms}
                isPublished={podcastResponse?.podcast?.is_published || false}
                uploadedNewPodcast={uploadedNewPodcast}
                t={t}
              />
              <FormSection
                step={step}
                addToPlayList={addToPlayList}
                setAddToPlayList={setAddToPlayList}
                podcastResponse={podcastResponse}
                selectedPlatforms={selectedPlatforms}
                setSelectedPlatforms={setSelectedPlatforms}
                setUploadedNewPodcast={setUploadedNewPodcast}
                podcast_id={podcast_id}
                t={t}
                dir={dir}
              />
            </div>
          </MaxWidthContainer>
        </form>
      </Form>
    </main>
  );
};

export default CreatePodcastForm;
