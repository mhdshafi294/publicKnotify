import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

const MessageContentFieltd = ({
  handleSubmit,
  handleError,
}: {
  handleSubmit: (data: any) => void;
  handleError: (errors: any) => void;
}) => {
  const t = useTranslations("Index");
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem className="w-full flex-1">
          <FormControl>
            <TextareaAutosize
              {...field}
              dir="auto"
              maxRows={3}
              rows={1}
              className="flex w-full min-h-fit focus-visible:outline-none bg-transparent flex-1 justify-start items-center border-none resize-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:opacity-70 focus-visible:ring-offset-transparent p-1"
              placeholder={t("write-a-message")}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  form.handleSubmit(handleSubmit, handleError)(e);
                }
              }}
            />
          </FormControl>
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

export default MessageContentFieltd;
