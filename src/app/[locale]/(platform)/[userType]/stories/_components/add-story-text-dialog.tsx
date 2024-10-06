"use client";

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
import SelectFormInput from "@/components/ui/select-form-input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AddStorySchema } from "@/schema/addStorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, SendHorizontalIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { useForm, useFormContext } from "react-hook-form";

const AddStoryTextDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) => {
  const t = useTranslations("Index");
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

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  // Error handler for form validation
  const handleError = (errors: any) => {
    console.error("Validation Errors:", errors);
  };

  // console.log(form.getValues());
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger className="w-full flex"></DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-3">
            <span>{t("text")}</span>
            <PencilIcon className="h-4 w-4" />
          </DialogTitle>
          <DialogDescription>Here you can add a text story.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={form.handleSubmit(handleSubmit, handleError)}
          >
            <div
              style={{
                backgroundColor: form.watch("color"),
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
                        placeholder={"What's on your mind?"}
                        className="w-fit h-fit p-3 resize-none bg-transparent text-3xl rounded-2xl text-center border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="capitalize font-normal" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex  justify-between gap-5">
              <SelectFormInput
                name="scope"
                className="w-full flex-1 rounded"
                placeholder="Select scope"
                label="Scope"
                control={form.control}
                options={["all", "company"]}
              />
              <ColorPicker
                control={form.control}
                className="w-full flex-1 rounded"
                name="color"
                label="background color"
              />
            </div>
            <Button type="submit" className="w-fit ms-auto">
              <SendHorizontalIcon size={24} />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStoryTextDialog;
