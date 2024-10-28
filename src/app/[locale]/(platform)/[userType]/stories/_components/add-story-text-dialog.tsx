"use client";

// External imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronRightIcon, PencilIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Local imports
import { createStoryAction } from "@/app/actions/storiesActions";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/ui/color-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/ui/loader";
import SelectFormInput from "@/components/ui/select-form-input";
import { Textarea } from "@/components/ui/textarea";
import { cn, getContrastTextColor } from "@/lib/utils";
import { AddStorySchema } from "@/schema/addStorySchema";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";

/**
 * Component for the Add Story Text Dialog.
 * Allows users to write text, select background color, set scope, and submit the story.
 *
 * @component
 * @returns {JSX.Element} The rendered AddStoryTextDialog component.
 *
 * @example
 * <AddStoryTextDialog />
 */
const AddStoryTextDialog = () => {
  const t = useTranslations("Index");

  // Dialog open state management
  const isOpen = useAddStoryDialogsStore(
    (state) => state.isStoryTextDialogOpen
  );
  const onOpenChange = useAddStoryDialogsStore(
    (state) => state.setStoryTextDialogIsOpen
  );

  // Form setup with validation schema and default values
  const form = useForm<AddStorySchema>({
    resolver: zodResolver(AddStorySchema),
    defaultValues: {
      scope: "all",
      description: "",
      color: "#000000",
      media: new File([], ""),
      thumbnail: new File([], ""),
    },
  });

  // Mutation to handle story submission
  const { mutate: server_createStoryAction, isPending } = useMutation({
    mutationFn: createStoryAction,
    onMutate: () => {
      toast.loading(t("sharing-your-story"));
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(t("your-story-has-been-shared-successfully"));
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast.dismiss();
      toast.error(t("authYoutubeError"));
    },
  });

  /**
   * Handles the form submission, sending story data to the server.
   *
   * @param {AddStorySchema} data - The form data to submit.
   */
  const handleSubmit = (data: AddStorySchema) => {
    const formData = new FormData();
    formData.append("scope", data.scope);
    formData.append("description", data.description || "");
    formData.append("color", data.color || "#000000");

    // Append media files to formData if present
    if (data.media && data.media.size > 0) formData.append("media", data.media);
    if (data.thumbnail && data.thumbnail.size > 0)
      formData.append("thumbnail", data.thumbnail);

    // Call mutation function
    server_createStoryAction({ type: "podcaster", formData });
  };

  /**
   * Handles form validation errors.
   *
   * @param {object} errors - Validation errors object.
   */
  const handleError = (errors: any) => {
    console.error("Validation Errors:", errors);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-3">
            <span>{t("text")}</span>
            <PencilIcon className="h-4 w-4" />
          </DialogTitle>
          <DialogDescription>
            {t("here-you-can-create-a-text-story")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={form.handleSubmit(handleSubmit, handleError)}
          >
            {/* Text area with background color picker */}
            <div
              style={{
                backgroundColor: form.watch("color"),
                color: getContrastTextColor(form.watch("color") || "#000000"),
              }}
              className={cn(
                "w-full h-[60dvh] flex justify-center items-center rounded-lg"
              )}
            >
              <FormField
                control={form.control}
                name={"description"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder={t("whats-on-your-mind")}
                        className="w-fit h-fit p-3 resize-none bg-transparent text-3xl rounded-2xl text-center border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="capitalize font-normal" />
                  </FormItem>
                )}
              />
            </div>

            {/* Input fields for scope selection and color picking */}
            <div className="w-full flex justify-between gap-5">
              <SelectFormInput
                name="scope"
                className="w-full flex-1 rounded"
                placeholder="Select scope"
                label={t("scope")}
                control={form.control}
                options={["all", "company"]}
              />
              <ColorPicker
                control={form.control}
                className="w-full flex-1 rounded"
                name="color"
                label={t("background-color")}
              />
            </div>

            {/* Submit button with loader and icon */}
            <Button
              type="submit"
              className="w-fit ms-auto flex justify-between items-center rounded-full gap-3"
              disabled={isPending || form.getValues().description?.length === 0}
            >
              {t("share")}
              {isPending ? <Loader size="sm" /> : ""}
              <ChevronRightIcon size={18} />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStoryTextDialog;
