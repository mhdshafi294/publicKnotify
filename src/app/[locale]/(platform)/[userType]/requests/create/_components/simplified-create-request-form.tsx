"use client";
import {
  createRequestAction,
  getAdvertisingTypesAction,
} from "@/app/actions/requestsActions";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AudioLines, FilmIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  podcast_format: z.string({
    required_error: "createMetadataSchema.errorMessage.typeRequired",
  }),
  advertising_type: z.string({
    required_error: "createMetadataSchema.errorMessage.addPlaceError",
  }),
  advertising_section_id: z.string({
    required_error: "createMetadataSchema.errorMessage.addPlaceError",
  }),
});

export default function SimplifiedCreateRequestForm({
  podcasterID,
}: {
  podcasterID: string;
}) {
  const t = useTranslations("Index");
  const { data: session, status } = useSession();
  const router = useRouter();
  const lang = useLocale();

  // Fetch contract data to edit
  const { data: ads_types } = useQuery({
    queryKey: ["ads_types"],
    queryFn: () =>
      getAdvertisingTypesAction({
        type: session?.user?.type!,
      }),
  });

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("podcaster_id", podcasterID);
      formData.append("type", values?.podcast_format);
      formData.append("advertising_section_id", values?.advertising_section_id);

      server_createRequestAction({ formData, type: "company" });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto pb-5 pt-10 w-full"
      >
        <FormField
          control={form.control}
          name="podcast_format"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Podcast Format</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the format of podcast media" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="audio">
                    <div className="capitalize flex justify-center items-center gap-2">
                      <AudioLines strokeWidth={2.5} size={15} />
                      <span>{t("audio")}</span>
                    </div>
                  </SelectItem>
                  <Separator className="bg-border-secondary" />
                  <SelectItem value="video">
                    <div className="capitalize flex justify-center items-center gap-2">
                      <FilmIcon strokeWidth={2.5} size={15} />
                      <span>{t("video")}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="advertising_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Advertising Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type of your AD" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ads_types?.types?.map((ad_type, index) => (
                    <>
                      {index !== 0 && (
                        <Separator className="bg-border-secondary" />
                      )}
                      <SelectItem
                        key={ad_type?.id}
                        value={ad_type.name[lang as "en" | "ar"]}
                        className="capitalize cursor-pointer"
                      >
                        <div className="capitalize flex justify-center items-center gap-2">
                          {ad_type.name[lang as "en" | "ar"]}
                        </div>
                      </SelectItem>
                    </>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="advertising_section_id"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 lg:grid-cols-3 items-center  gap-3 w-full"
                >
                  {ads_types?.types
                    ?.find(
                      (ad_type) =>
                        ad_type.name[lang as "en" | "ar"] ===
                        form?.watch("advertising_type")
                    )
                    ?.sections?.map((section) => (
                      <FormItem
                        key={section?.id}
                        className="flex items-center space-x-3 space-y-0 bg-card/35 rounded-[20px] px-2 py-3 w-60"
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={section?.id.toString()}
                            checkIcon
                            className={cn(
                              "min-w-fit",
                              "size-7 border-none bg-greeny/10"
                            )}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {section.name[lang as "en" | "ar"]}
                        </FormLabel>
                      </FormItem>
                    ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="w-full flex justify-end gap-3">
          <Button
            variant={"destructive"}
            type="button"
            className="rounded-full px-10 capitalize"
          >
            {t("cancel")}
          </Button>
          <Button type="submit" className="rounded-full px-10 capitalize">
            {t("submit")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
