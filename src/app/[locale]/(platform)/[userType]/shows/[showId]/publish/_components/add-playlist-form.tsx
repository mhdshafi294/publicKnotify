"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { createPlayListsAction } from "@/app/actions/podcastActions";
import { createPlaylistSchema } from "@/schema/createPlaylistSchema";

import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import FormFileInput from "@/components/ui/form-input-file";
import FormInputSelect from "@/components/ui/form-input-select";
import FormInputTextarea from "@/components/ui/form-input-textarea";

/**
 * Component for adding a new playlist.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.open - Whether the form is open.
 * @param {Function} props.onOpenChange - Function to change the open state.
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * ```tsx
 * <AddPlaylistForm open={true} onOpenChange={setOpen} />
 * ```
 */
const AddPlaylistForm: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const [isMounted, setIsMounted] = useState(false);
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();

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
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    formData.append("type", data.type);
    if (data.image) formData.append("image", data.image);

    server_createPlaylistAction({ formData, type: "podcaster" });
  };

  if (!isMounted) return null;

  return (
    <main className="flex flex-1 flex-col items-center justify-start gap-6 w-full min-h-[clac(100vh_-_20px)]">
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
                onClick={form.handleSubmit((data) => handleSubmit(data))}
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
