"use client";

import { createPlayListsAction } from "@/app/actions/podcastActions";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import FormFileInput from "@/components/ui/form-input-file";
import FormInputSelect from "@/components/ui/form-input-select";
import FormInputTextarea from "@/components/ui/form-input-textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "@/navigation";
import { createPlaylistSchema } from "@/schema/createPlaylistSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddPlaylistForm = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const searchParams = useSearchParams();
  const request_id = searchParams.get("request_id");
  const podcast_id = searchParams.get("podcast_id");
  const params = new URLSearchParams(searchParams.toString());

  const form = useForm<createPlaylistSchema>({
    resolver: zodResolver(createPlaylistSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "full",
      image: undefined,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    data,
    mutate: server_createPlaylistAction,
    isPending,
    error,
  } = useMutation({
    mutationFn: createPlayListsAction,
    onMutate: () => {
      toast.loading("Creating new playlist...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Playlist created successfully");
      queryClient.invalidateQueries({ queryKey: ["selectplaylists"] });
      onOpenChange(false);
      // router.push(`?${params.toString()}`);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong. Please try again!");
      console.log(error);
    },
  });

  const handleSubmit = async (data: createPlaylistSchema) => {
    // console.log("Form data: ", data);
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    formData.append("type", data.type);
    if (data.image) formData.append("image", data.image);

    console.log("FormData: ", formData);

    server_createPlaylistAction({ formData, type: "podcaster" });
  };

  if (!isMounted) return null;

  return (
    <main className="flex flex-col items-center justify-start gap-6 w-full min-h-[clac(100vh_-_20px)]">
      <Form {...form}>
        <form className="w-full flex flex-col gap-5 px-0">
          <div className="h-full">
            <div className="flex flex-col gap-3">
              <FormInput
                name="name"
                className="w-full bg-input"
                placeholder="Playlist Name"
                label="Name"
                control={form.control}
              />
              <FormInputTextarea
                name="description"
                className="w-full bg-input"
                label="Playlist description"
                placeholder="Tell us a little about this playlist"
                control={form.control}
              />
              <FormInputSelect
                name="type"
                control={form.control}
                className="w-full bg-input"
                label="Type"
                options={["full", "bonus", "trailer"]}
              />
              <FormFileInput
                name="image"
                label="Playlist image"
                control={form.control}
              />
              <Button
                disabled={isPending}
                className="capitalize mt-7 text-sm w-full"
                variant={"default"}
                onClick={form.handleSubmit((data) => {
                  console.log("Form submitted", data);
                  handleSubmit(data);
                })}
                type="button"
              >
                {isPending ? <ButtonLoader /> : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default AddPlaylistForm;
