"use client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createRequestAction } from "@/app/actions/requestsActions";
import SelectPodcaster from "@/components/select-podcaster";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import DatePicker from "@/components/ui/date-picker";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormCheckbox from "@/components/ui/form-checkbox";
import FormInput from "@/components/ui/form-input";
import FormFileInput from "@/components/ui/form-input-file";
import TimePicker from "@/components/ui/time-picker";
import { useRouter } from "@/navigation";
import { createRequestSchema } from "@/schema/requestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import PriceRadioGroupFormInput from "@/components/ui/price-radio-group-form-input";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import DurationPickerFormInput from "@/components/ui/duration-picker-form-input";
import ArrayFormInput from "@/components/ui/array-form-input";
import ToggleFormInput from "@/components/ui/toggle-form-input";
import { YoutubeIcon } from "lucide-react";
import SpotifyIcon from "@/components/icons/spotify-icon";
import { getCategoriesAction } from "@/app/actions/podcastActions";
import ArraySelectManyFormInput from "@/components/ui/array-select-many-form-input";
import { getPodcasterAction } from "@/app/actions/podcasterActions";

const CreateRequest = () => {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

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
  }, [isMounted, session, router]);

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
      ad_period: "1:0",
      ad_place: "first",
      podcaster_id: "",
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
    data,
    mutate: server_createRequestAction,
    isPending,
    error,
  } = useMutation({
    mutationFn: createRequestAction,
    onMutate: () => {
      toast.loading("Creating request...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Request created successfully");
      router.push(`/company/requests`);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong. Please try again!");
      console.log(error);
    },
  });

  const handleSubmit = async (data: createRequestSchema) => {
    console.log(data);
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

  if (!isMounted) return null;

  return (
    <main className="flex flex-col items-center justify-center gap-6 w-full mt-10">
      <Form {...form}>
        <form
          className="w-full px-0"
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
        >
          <MaxWidthContainer className="flex flex-col-reverse gap-5 lg:grid lg:grid-cols-12 justify-items-stretch content-stretch items-stretch mb-5">
            <div className="lg:col-span-3 lg:me-10 lg:h-full">
              <Card className="bg-card/50 border-card-foreground/10 w-full h-full px-3 lg:px-5 py-10 pb-2 ">
                <CardHeader className="py-0 px-0 text-xl">
                  Where to add your AD
                </CardHeader>
                <CardContent className="px-0 mt-5">
                  <PriceRadioGroupFormInput
                    name="ad_place"
                    label="AD type & position"
                    control={form.control}
                    options={["first", "middle", "end", "video"]}
                    price={podcaster?.price}
                    className="bg-background h-full py-5 rounded-lg px-3"
                    labelClassName="text-lg w-full h-full"
                    groupClassName="flex-col items-start gap-3"
                    groupItemClassName="bg-card/50 rounded-lg px-5 w-full"
                    radioGroupItemClassName="size-6 border-none bg-greeny/10"
                  />
                  <div className="space-y-2 mt-5">
                    <p className="text-lg">Distripution Channels</p>
                    <div className="w-full flex justify-start gap-2 items-center">
                      <ToggleFormInput
                        name="publish_youtube"
                        control={form.control}
                        className=" size-10 px-1.5"
                        icon={<YoutubeIcon size={32} />}
                        disabled={!podcaster?.youtube_account}
                      />
                      <ToggleFormInput
                        name="publish_spotify"
                        control={form.control}
                        className=" size-10 px-1.5"
                        icon={<SpotifyIcon size={32} />}
                        disabled={!podcaster?.youtube_account}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="lg:hidden">
                  <Button
                    disabled={isPending}
                    className="w-full capitalize mt-0"
                    type="submit"
                  >
                    {isPending ? <ButtonLoader /> : "Continue"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="lg:col-span-9 space-y-5">
              <div className="w-full flex justify-between">
                <h1 className="text-xl font-bold">Create Request</h1>
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
                    <FormField
                      control={form.control}
                      name="podcaster_id"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-lg capitalize">
                            Podcaster
                          </FormLabel>
                          <SelectPodcaster
                            setValue={field.onChange}
                            value={field.value}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
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
                    {/* <PriceRadioGroupFormInput
                      name="type"
                      label="Type"
                      control={form.control}
                      options={["audio", "video"]}
                      className="h-[65px]"
                    /> */}
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
                    <DurationPickerFormInput
                      name="ad_period"
                      className="bg-background"
                      label="Period"
                      control={form.control}
                    />
                  </div>
                  {/* <div className="w-full flex justify-between gap-5"> */}
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
                  {/* </div> */}
                  <FormCheckbox
                    name="terms"
                    control={form.control}
                    className="mt-0"
                    checkboxClassName="size-4 rounded-full"
                    label="I accept the terms and privacy policy"
                  />
                </CardContent>
                <CardFooter className="hidden lg:block">
                  <Button
                    disabled={isPending}
                    className="w-full capitalize mt-0"
                    type="submit"
                  >
                    {isPending ? <ButtonLoader /> : "Continue"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </MaxWidthContainer>
        </form>
      </Form>
    </main>
  );
};

export default CreateRequest;
