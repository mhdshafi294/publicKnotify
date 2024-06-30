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
import { useRouter } from "@/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
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

const CreatePodcastForm = () => {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const request_id = searchParams.get("request_id");
  const podcast_id = searchParams.get("podcast_id");

  const form = useForm<createMetadataSchema>({
    resolver: zodResolver(createMetadataSchema),
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
      company_request_id: "",
      podcast_id: "",
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
    isPending: ispodcastPending,
    isError: ispodcastError,
    refetch: refetchPodcast,
  } = useQuery({
    queryKey: ["podcast_draft"],
    queryFn: () => getSelfPodcastAction({ id: podcast_id!, type: "podcaster" }),
    enabled: !!podcast_id,
  });

  useEffect(() => {
    if (podcast_id) {
      refetchPodcast();
      console.log(podcastResponse?.podcast);
      if (podcastResponse) {
        form.setValue("name", podcastResponse?.podcast?.name!);
        form.setValue("summary", podcastResponse?.podcast?.summary!);
        form.setValue("type", podcastResponse?.podcast?.type!);
        form.setValue(
          "publishing_date",
          new Date(podcastResponse?.podcast?.publishing_date!)
        );
        form.setValue(
          "publishing_time",
          podcastResponse?.podcast?.publishing_time!
        );
        form.setValue(
          "categories",
          podcastResponse?.podcast?.categories.map(
            (category) => category.name
          ) as [string, ...string[]]
        );
        form.setValue(
          "hashtags",
          podcastResponse?.podcast?.hashTags.map((hashTag) => hashTag.name) as [
            string,
            ...string[]
          ]
        );
        form.setValue(
          "company_request_id",
          podcastResponse?.podcast?.request_id!
        );
        form.setValue("podcast_id", podcast_id);
      }
    }
  }, [podcast_id, podcastResponse]);

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
      toast.success("podcast metadata created successfully");
      // router.push(`/company/requests`);
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
      toast.success("podcast metadata updated successfully");
      // router.push(`/company/requests`);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong. Please try again!");
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

    if (data.thumbnail) formData.append("thumbnail", data.thumbnail);
    if (data.background) formData.append("background", data.background);

    data.categories.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });
    data.hashtags.forEach((hashtag, index) => {
      formData.append(`hashtags[${index}]`, hashtag);
    });

    if (data.company_request_id)
      formData.append("company_request_id", data.company_request_id);

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
    <main className="flex flex-col items-center justify-center gap-6 w-full">
      <Form {...form}>
        <form
          className="w-full px-0"
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
        >
          <MaxWidthContainer className="flex flex-col-reverse gap-5 lg:grid lg:grid-cols-12 justify-items-stretch content-stretch items-stretch">
            <div className=" space-y-5 lg:col-start-4 lg:col-span-9">
              <div className="w-full flex justify-between">
                <h1 className="text-xl font-bold">Create Request</h1>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    disabled={
                      isPendingUpdateMetadata || isPendingCreateMetadata
                    }
                    className=" capitalize mt-0"
                    type="submit"
                  >
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
                    />
                    <FormFileInput
                      name="background"
                      label="Background"
                      control={form.control}
                      className="w-full"
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
                    action={getCategoriesAction()}
                  />
                  <ArrayFormInput
                    name="hashtags"
                    control={form.control}
                    label="Hashtags"
                    className="w-full bg-background"
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
