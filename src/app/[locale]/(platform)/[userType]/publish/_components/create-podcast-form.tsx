"use client";
import SelectPlayList from "@/app/[locale]/(platform)/[userType]/publish/_components/select-play-list";
import {
  createMetadataAction,
  getCategoriesAction,
  getSelfPodcastAction,
  updateMetadataAction,
} from "@/app/actions/podcastActions";
import { getRequestAction } from "@/app/actions/requestsActions";
import WebIcon from "@/components/icons/web-icon";
import YoutubeIcon from "@/components/icons/youtube-icon";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import ArrayFormInput from "@/components/ui/array-form-input";
import ArraySelectManyFormInput from "@/components/ui/array-select-many-form-input";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/date-picker";
import FileUploader from "@/components/ui/file-uploader";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import FormFileInput from "@/components/ui/form-input-file";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import SelectFormInput from "@/components/ui/select-form-input";
import TimePicker from "@/components/ui/time-picker";
import { API_URL, PODCASTS, UPLOAD_MEDIA_FILE } from "@/lib/apiEndPoints";
import { cn, getDirection } from "@/lib/utils";
import { createMetadataSchema } from "@/schema/createMetadataSchema";
import { SelfPodcastDetails } from "@/types/podcast";
import { RequestDetails } from "@/types/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { SaveIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import DistriputionChannelButtonCard from "./distripution-channel-button-card";
import PublishButton from "./publish-button";

const CreatePodcastForm = ({
  setIsShow,
}: {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();
  const t = useTranslations("Index");

  const [isMounted, setIsMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [addToPlayList, setAddToPlayList] = useState(false);
  const [uploadedNewPodcast, setUploadedNewPodcast] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["web"]); // Selected platforms to publish the podcast on
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<
    SelfPodcastDetails | RequestDetails | null
  >();
  const router = useRouter();
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const request_id = searchParams.get("request_id");
  const podcast_id = searchParams.get("podcast_id");
  const params = new URLSearchParams(searchParams.toString());
  // const url = new URL(window.location.href);
  const locale = useLocale();
  const dir = getDirection(locale);

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

  const {
    data: podcastResponse,
    isPending: isPodcastPending,
    isError: isPodcastError,
    refetch: refetchPodcast,
  } = useQuery({
    queryKey: ["podcast_draft", podcast_id],
    queryFn: () => getSelfPodcastAction({ id: podcast_id!, type: "podcaster" }),
    enabled: !!podcast_id && isMounted,
  });

  const {
    data: requestResponse,
    isPending: isRequestPending,
    isError: isRequestError,
    refetch: refetchRequest,
  } = useQuery({
    queryKey: ["podcast_draft", podcast_id],
    queryFn: () => getRequestAction({ id: request_id!, type: "podcaster" }),
    enabled: !!request_id && !podcast_id && isMounted,
  });

  useEffect(() => {
    if (podcastResponse && podcastResponse?.podcast?.is_published) {
      router.push(`/${session?.user?.type}`); // TODO: redirect to podcast page
    }
  }, [podcastResponse]);

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

  useEffect(() => {
    console.log(draft);
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
  }, [podcast_id, draft]);

  const {
    data: createMetadataActionResponse,
    mutate: server_createMetadataAction,
    isPending: isPendingCreateMetadata,
    error: errorCreateMetadata,
  } = useMutation({
    mutationFn: createMetadataAction,
    onMutate: () => {
      toast.loading(t("creatingPodcastMetadata"));
      console.log(params.toString());
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(t("podcastMetadataCreated"));
      params.set("podcast_id", data?.podcast_id!);
      setStep(2);
      queryClient.invalidateQueries({ queryKey: ["podcastsDrafts"] });
      router.push(`publish?${params.toString()}`);
    },
    onError: () => {
      toast.dismiss();
      toast.error(t("somethingWentWrong"));
      console.log(errorCreateMetadata);
    },
  });

  const {
    data: updateMetadataActionResponse,
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
      console.log(errorUpdateMetadata);
    },
  });

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

    // console.log("FormData: ", formData);

    if (request_id && !podcast_id)
      formData.append("company_request_id", request_id);

    if (podcast_id) {
      try {
        server_updateMetadataAction({
          formData,
          type: "podcaster",
          id: podcast_id,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      server_createMetadataAction({ formData, type: "podcaster" });
    }
  };

  if (!isMounted) return null;

  const content = () => {
    if (step === 1)
      return (
        <>
          <div className="w-full flex justify-between gap-5">
            <FormInput
              name="name"
              className="bg-background w-full"
              placeholder={t("podcastNamePlaceholder")}
              label={t("nameLabel")}
              control={form.control}
            />
            <SelectFormInput
              name="type"
              placeholder={t("podcastTypePlaceholder")}
              label={t("typeLabel")}
              control={form.control}
              options={["audio", "video"]}
            />
          </div>
          <FormInputTextarea
            name="summary"
            label={t("summaryLabel")}
            placeholder={t("summaryPlaceholder")}
            control={form.control}
          />
          <div className="w-full flex justify-between gap-5 items-start flex-wrap">
            <div className="w-[29%]">
              <FormInput
                name="company_tag"
                className="bg-background"
                placeholder={t("companyTagPlaceholder")}
                label={t("companyTagLabel")}
                control={form.control}
              />
            </div>
            <DatePicker
              className="w-[29%]"
              name="publishing_date"
              label={t("dateLabel")}
              control={form.control}
            />
            <TimePicker
              className="w-[29%]"
              name="publishing_time"
              label={t("timeLabel")}
              control={form.control}
            />
          </div>
          <div className="w-full space-y-3">
            <div className="flex items-center gap-3" dir={dir}>
              <Checkbox
                checked={addToPlayList}
                onCheckedChange={() => setAddToPlayList(!addToPlayList)}
                id="add_to_playlist"
                className="size-6 rounded-full"
              />
              <label
                htmlFor="add_to_playlist"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("addToPlayListLabel")}
              </label>
            </div>
            {addToPlayList ? (
              <FormField
                control={form.control}
                name="play_list_id"
                render={({ field }) => (
                  <FormItem className="w-full" dir={dir}>
                    <FormLabel className="text-lg capitalize">
                      {t("playlistLabel")}
                    </FormLabel>
                    <SelectPlayList
                      setValue={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
          </div>
          <div className="w-full flex justify-between gap-5">
            <ArraySelectManyFormInput
              name="categories"
              control={form.control}
              label={t("categoriesLabel")}
              className="w-full bg-background"
              action={getCategoriesAction}
              defaultValues={form.getValues()}
            />
          </div>
          <ArrayFormInput
            name="hashtags"
            control={form.control}
            label={t("hashtagsLabel")}
            className="w-full bg-background"
            defaultValues={form.getValues()}
          />
          <div className="w-full flex justify-between gap-5">
            <FormFileInput
              name="thumbnail"
              label={t("thumbnailLabel")}
              control={form.control}
              className="w-full"
              initValue={
                podcastResponse?.podcast?.thumbnail
                  ? podcastResponse?.podcast?.thumbnail
                  : undefined
              }
            />
            <FormFileInput
              name="background"
              label={t("backgroundLabel")}
              disabled={form.getValues("type") === "video"}
              control={form.control}
              className="w-full"
              initValue={
                podcastResponse?.podcast?.background
                  ? podcastResponse?.podcast?.background
                  : undefined
              }
            />
          </div>
        </>
      );
    else if (step === 2)
      return (
        <div
          className="w-full flex flex-col gap-2 h-full justify-center"
          dir={dir}
        >
          <>
            <FormLabel className={"capitalize text-lg"} dir={dir}>
              {t("yourPodcastLabel")}
            </FormLabel>
            <FileUploader
              key={form.watch("type")}
              uploadId={podcast_id}
              type={podcastType}
              endpoint={`${API_URL}podcaster${PODCASTS}${UPLOAD_MEDIA_FILE}`}
              initValue={
                podcastResponse?.podcast?.podcast
                  ? podcastResponse?.podcast?.podcast
                  : undefined
              }
              onUploadSuccess={() => console.log("Upload success")}
              onUploadError={(error) => console.log("Upload error", error)}
              setUploadedNewPodcast={setUploadedNewPodcast}
            />
            <p className="text-xs mt-1 opacity-80">{t("supportedFiles")}</p>
          </>
          <div className="w-full flex flex-col gap-3 lg:gap-5 mt-5 lg:mt-10">
            <h3 className="capitalize text-lg">
              {t("mainDistributionChannels")}
            </h3>
            <div className="w-full flex gap-5">
              <DistriputionChannelButtonCard
                platfotmName="web"
                PlatfotmIcon={WebIcon}
                selectedPlatforms={selectedPlatforms}
                setSelectedPlatforms={setSelectedPlatforms}
              />
              <DistriputionChannelButtonCard
                platfotmName="youtube"
                PlatfotmIcon={YoutubeIcon}
                selectedPlatforms={selectedPlatforms}
                setSelectedPlatforms={setSelectedPlatforms}
              />
            </div>
          </div>
        </div>
      );
  };
  console.log(uploadedNewPodcast);

  return (
    <main className="flex flex-col items-center justify-start gap-6 w-full min-h-[clac(100vh_-_20px)]">
      <Form {...form}>
        <form
          className="w-full px-0"
          onSubmit={form.handleSubmit((data) => {
            // console.log("Form submitted", data);
            handleSubmit(data);
          })}
        >
          <MaxWidthContainer className="flex flex-col-reverse gap-5 lg:grid lg:grid-cols-12 justify-items-stretch content-stretch items-stretch pb-3">
            <div className="space-y-5 lg:col-start-4 lg:col-span-9">
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col justify-between lg:justify-center items-start">
                  <h1 className="text-xl font-bold">
                    {t("podcastDraftLabel")}
                  </h1>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    className="capitalize text-sm   lg:hidden"
                    variant="secondary"
                    onClick={() => setIsShow(true)}
                    type="button"
                  >
                    {t("draftsButton")}
                  </Button>
                  <Button
                    disabled={
                      isPendingUpdateMetadata || isPendingCreateMetadata
                    }
                    className={cn("capitalize mt-0 text-sm", {
                      hidden: step === 2,
                    })}
                    variant={"default"}
                    type="submit"
                  >
                    {isPendingUpdateMetadata || isPendingCreateMetadata ? (
                      <ButtonLoader />
                    ) : (
                      t("continueButton")
                    )}
                  </Button>
                  <Button
                    disabled={
                      isPendingUpdateMetadata || isPendingCreateMetadata
                    }
                    className={cn("capitalize mt-0 text-sm", {
                      hidden: step === 1,
                    })}
                    variant={"secondary"}
                    type="button"
                    onClick={() => setStep(1)}
                  >
                    {isPendingUpdateMetadata || isPendingCreateMetadata ? (
                      <ButtonLoader />
                    ) : (
                      t("backButton")
                    )}
                  </Button>
                  <Button
                    disabled={
                      isPendingUpdateMetadata || isPendingCreateMetadata
                    }
                    className={cn("capitalize mt-0 text-sm", {
                      hidden: step === 1,
                    })}
                    variant={"outline"}
                    type="submit"
                  >
                    <SaveIcon className="size-4 me-1.5" strokeWidth={1.5} />
                    {isPendingUpdateMetadata || isPendingCreateMetadata ? (
                      <ButtonLoader />
                    ) : (
                      t("saveButton")
                    )}
                  </Button>
                  <PublishButton
                    className={cn({ hidden: step === 1 })}
                    podcast_id={podcast_id!}
                    disabled={
                      (podcastResponse?.podcast?.is_published ||
                        podcastResponse?.podcast?.podcast.length === 0 ||
                        !podcast_id) &&
                      !uploadedNewPodcast
                    }
                    selectedPlatform={selectedPlatforms}
                  />
                </div>
              </div>
              <Card className="bg-card/50 border-card-foreground/10 w-full h-[calc(100vh-184px)] min-h-[50dvh] px-2 lg:px-7 py-10 pb-2">
                <ScrollArea className="h-full">
                  <CardContent className="flex flex-col gap-7">
                    {content()}
                  </CardContent>
                </ScrollArea>
              </Card>
            </div>
          </MaxWidthContainer>
        </form>
      </Form>
    </main>
  );
};

export default CreatePodcastForm;
