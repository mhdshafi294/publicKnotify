"use client";

import { createRequestAction } from "@/app/actions/requestsActions";
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
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormCheckbox from "@/components/ui/form-checkbox";
import FormInput from "@/components/ui/form-input";
import FormFileInput from "@/components/ui/form-input-file";
import { cn } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { createRequestSchema } from "@/schema/requestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateRequest = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && session?.user?.type !== "company") {
      router.push(`/${session?.user?.type}`);
    }
  }, [isMounted, session, router]);

  const form = useForm<createRequestSchema>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      name: "",
      summary: "",
      type: "video",
      publishing_date: new Date(),
      publishing_time: "16:11",
      company_tag: "",
      thumbnail: new File([], ""),
      background: new File([], ""),
      categories: [],
      hashtags: [],
      ad_period: "16:11",
      ad_place: "first",
      podcaster_id: "",
      publish_youtube: "0",
      publish_spotify: "0",
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
    formData.append("background", data.background);

    data.categories.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });
    data.hashtags.forEach((hashtag, index) => {
      formData.append(`hashtags[${index}]`, hashtag);
    });

    formData.append("ad_period", data.ad_period);
    formData.append("ad_place", data.ad_place);
    formData.append("podcaster_id", data.podcaster_id);
    formData.append("publish_youtube", data.podcaster_id);
    formData.append("publish_spotify", data.podcaster_id);

    server_createRequestAction({ formData, type: "company" });
  };

  const {
    data,
    mutate: server_createRequestAction,
    isPending,
  } = useMutation({
    mutationFn: createRequestAction,
    onSuccess: () => {
      router.push(`/company/requests`);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again!");
    },
  });

  return (
    <main className="flex flex-col items-center justify-center gap-6 w-full mt-20">
      <Form {...form}>
        <form
          className="w-full px-0"
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
        >
          <MaxWidthContainer className="grid grid-cols-12">
            <div className="col-span-3 me-10">
              <Card className="bg-card/50 border-card-foreground/10 w-full min-h-[50dvh] lg:px-7 lg:py-3">
                <CardHeader>Where to add your Ad</CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
            <div className="col-span-9 space-y-5">
              <div className="w-full flex justify-between">
                <h1 className="text-xl font-bold">Create Request</h1>
              </div>
              <Card className="bg-card/50 border-card-foreground/10 w-full min-h-[50dvh] lg:px-7 lg:py-3">
                <CardContent className="flex flex-col gap-5">
                  <div className="w-full flex justify-between items-center">
                    <FormInput
                      name="name"
                      label="Name"
                      control={form.control}
                    />
                  </div>
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
                  <div className="w-full flex justify-between items-center">
                    <DatePicker
                      name="publishing_date"
                      label="Date"
                      control={form.control}
                    />
                  </div>
                  <FormCheckbox
                    name="terms"
                    control={form.control}
                    className="rounded-full size-4"
                    label="I accept the terms and privacy policy"
                  />
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={isPending}
                    className="w-full capitalize mt-8"
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
