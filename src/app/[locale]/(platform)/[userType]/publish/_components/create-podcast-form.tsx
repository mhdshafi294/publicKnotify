"use client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { Card, CardContent } from "@/components/ui/card";
import DatePicker from "@/components/ui/date-picker";
import { Form } from "@/components/ui/form";
import FormCheckbox from "@/components/ui/form-checkbox";
import FormInput from "@/components/ui/form-input";
import FormFileInput from "@/components/ui/form-input-file";
import TimePicker from "@/components/ui/time-picker";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import ArrayFormInput from "@/components/ui/array-form-input";
import {
  createMetadataAction,
  getCategoriesAction,
  getSelfPodcastAction,
  updateMetadataAction,
} from "@/app/actions/podcastActions";
import { useSearchParams } from "next/navigation";
import { createMetadataSchema } from "@/schema/createMetadataSchema";
import ArraySelectManyFormInput from "@/components/ui/array-select-many-form-input";
import SelectFormInput from "@/components/ui/select-form-input";
import { SelfPodcastDetails } from "@/types/podcast";
import { getRequestAction } from "@/app/actions/requestsActions";
import { RequestDetails } from "@/types/request";
import { SaveIcon } from "lucide-react";

const CreatePodcastForm = ({
  setIsShow,
}: {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [draft, setDraft] = useState<
    SelfPodcastDetails | RequestDetails | null
  >();
  const router = useRouter();
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const request_id = searchParams.get("request_id");
  const podcast_id = searchParams.get("podcast_id");
  const params = new URLSearchParams(searchParams.toString());

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
      categories: [],
      hashtags: [],
      company_request_id: "",
      podcast_id: "",
      terms: false,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      toast.loading("Creating podcast metadata...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Podcast metadata created successfully");
      queryClient.invalidateQueries({ queryKey: ["podcastsDrafts"] });
      params.set("podcast_id", podcast_id!);
      router.push(`?${params.toString()}`);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong. Please try again!");
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
      toast.loading("Updating podcast metadata...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Podcast metadata updated successfully");
      queryClient.invalidateQueries({ queryKey: ["podcastsDrafts"] });
      params.set("podcast_id", podcast_id!);
      router.push(`?${params.toString()}`);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong. Please try again!");
      console.log(errorUpdateMetadata);
    },
  });

  const handleSubmit = async (data: createMetadataSchema) => {
    console.log("Form data: ", data);
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

    if (data.thumbnail) formData.append("thumbnail", data.thumbnail);
    if (data.background) formData.append("background", data.background);

    data.categories.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });
    data.hashtags.forEach((hashtag, index) => {
      formData.append(`hashtags[${index}]`, hashtag);
    });

    console.log("FormData: ", formData);

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

  return (
    <main className="flex flex-col items-center justify-center gap-6 w-full">
      <Form {...form}>
        <form
          className="w-full px-0"
          onSubmit={form.handleSubmit((data) => {
            console.log("Form submitted", data);
            handleSubmit(data);
          })}
        >
          <MaxWidthContainer className="flex flex-col-reverse gap-5 lg:grid lg:grid-cols-12 justify-items-stretch content-stretch items-stretch pb-3">
            <div className="space-y-5 lg:col-start-4 lg:col-span-9">
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col justify-between lg:justify-center items-start">
                  <h1 className="text-xl font-bold">Podcast Draft</h1>
                  <Button
                    className="capitalize mt-0 text-sm border-none bg-transparent hover:border-none hover:bg-transparent pl-0"
                    variant="outline"
                    onClick={() => setIsShow(true)}
                    type="button"
                  >
                    Drafts
                  </Button>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    disabled={
                      isPendingUpdateMetadata || isPendingCreateMetadata
                    }
                    className="capitalize mt-0 text-sm"
                    type="submit"
                  >
                    <SaveIcon className="size-3 mr-1" />
                    {isPendingUpdateMetadata || isPendingCreateMetadata ? (
                      <ButtonLoader />
                    ) : (
                      "Save draft"
                    )}
                  </Button>
                </div>
              </div>
              <Card className="bg-card/50 border-card-foreground/10 w-full min-h-[50dvh] px-2 lg:px-7 py-10 pb-2">
                <CardContent className="flex flex-col gap-7">
                  <div className="w-full flex justify-between items-center gap-5">
                    <FormInput
                      name="name"
                      className="bg-background w-full"
                      placeholder="Podcast Name"
                      label="Name"
                      control={form.control}
                    />
                    <SelectFormInput
                      name="type"
                      placeholder="Podcast Type"
                      label="Type"
                      control={form.control}
                      options={["audio", "video"]}
                    />
                  </div>
                  <FormInputTextarea
                    name="summary"
                    label="Podcast Summary"
                    placeholder="Tell us a little about your podcast"
                    control={form.control}
                  />
                  <div className="w-full flex justify-between items-center gap-5">
                    <FormFileInput
                      name="thumbnail"
                      label="Thumbnail"
                      control={form.control}
                      className="w-full"
                      initValue={
                        podcastResponse?.podcast?.thumbnail
                          ? podcastResponse?.podcast?.thumbnail
                          : requestResponse?.request?.thumbnail
                      }
                    />
                    <FormFileInput
                      name="background"
                      label="Background"
                      control={form.control}
                      className="w-full"
                      initValue={
                        podcastResponse?.podcast?.background
                          ? podcastResponse?.podcast?.background
                          : requestResponse?.request?.background
                      }
                    />
                  </div>
                  <div className="w-full flex justify-between gap-5 items-start flex-wrap">
                    <div>
                      <FormInput
                        name="company_tag"
                        className="bg-background"
                        placeholder="Company"
                        label="Company Tag"
                        control={form.control}
                      />
                    </div>
                    <DatePicker
                      name="publishing_date"
                      label="Date"
                      control={form.control}
                    />
                    <TimePicker
                      name="publishing_time"
                      label="Time"
                      control={form.control}
                    />
                  </div>
                  <ArraySelectManyFormInput
                    name="categories"
                    control={form.control}
                    label="Categories"
                    className="w-full bg-background"
                    action={getCategoriesAction}
                    defaultValues={form.getValues()}
                  />
                  <ArrayFormInput
                    name="hashtags"
                    control={form.control}
                    label="Hashtags"
                    className="w-full bg-background"
                    defaultValues={form.getValues()}
                  />
                  <FormCheckbox
                    name="terms"
                    control={form.control}
                    className="mt-0"
                    checkboxClassName="size-4 rounded-full"
                    label="I accept the terms and privacy policy"
                  />
                </CardContent>
              </Card>
            </div>
          </MaxWidthContainer>
        </form>
      </Form>
    </main>
  );
};

export default CreatePodcastForm;
