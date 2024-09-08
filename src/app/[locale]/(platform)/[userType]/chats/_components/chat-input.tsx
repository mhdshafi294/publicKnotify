"use client";

import TextareaAutosize from "react-textarea-autosize";
import {
  ImageIcon,
  PaperclipIcon,
  SendHorizonalIcon,
  SendIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageStoreSchema } from "@/schema/messageStoreSchema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { storeMessageAction } from "@/app/actions/conversationsActions";
import { toast } from "sonner";
import { ZodError } from "zod";
import MessageContentFieltd from "./message-content-fieltd";
import ChatImageInputDialog from "./chat-image-input-dialog";
import { Input } from "@/components/ui/input";

type ChatInputProps = {
  conversation_id: string | undefined;
  type: string;
};

const ChatInput: React.FC<ChatInputProps> = ({ conversation_id, type }) => {
  const t = useTranslations("Index");

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const form = useForm<MessageStoreSchema>({
    resolver: zodResolver(MessageStoreSchema),
    defaultValues: {
      conversation_id: conversation_id,
      content: "",
      media: [],
    },
  });

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation_id]);

  useEffect(() => {
    if (form.watch("media")?.length! > 0) {
      setImageDialogOpen(true);
    } else {
      setImageDialogOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("media")]);

  const {
    data,
    mutate: server_storeMessageAction,
    isPending,
    error,
  } = useMutation({
    mutationFn: storeMessageAction,
    onMutate: () => {},
    onSuccess: (data) => {},
    onError: (error) => {
      toast.dismiss();
      console.log(error, "mutate error");
    },
  });

  const handleSubmit = async (data: MessageStoreSchema) => {
    console.log(data);
    try {
      // console.log(data);
      // Your form submission logic here
      const formData = new FormData();
      formData.append("conversation_id", data.conversation_id);
      formData.append("content", data.content);
      if (data.media && data.media.length > 0) {
        data.media.forEach((media, index) => {
          formData.append(`media[${index}]`, media);
        });
      }

      server_storeMessageAction({ formData, type });
      form.reset();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("Zod validation error:", error.errors);
      } else {
        console.error("Other error:", error);
      }
    }
  };

  const handleError = (errors: any) => {
    // console.log(showId, "<<<<<<<<<<showId");
    // console.log(form.getValues().play_list_id, "<<<<<<<<play_list_id");
    console.log("Validation Errors:", errors);
  };

  // File input change handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      form.setValue(
        "media",
        Array.from(files), // Converts FileList to array
        { shouldValidate: true }
      );
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full absolute bottom-0 bg-card rounded-b-2xl flex items-center justify-between p-3"
        onSubmit={form.handleSubmit(handleSubmit, handleError)}
      >
        {/* File Upload Button */}
        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem className="h-fit space-y-0 p-2 ">
              <FormControl>
                <label className="group cursor-pointer ">
                  <PaperclipIcon className="opacity-50 group-hover:opacity-100 duration-200" />
                  <Input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </FormControl>
            </FormItem>
          )}
        />
        <ChatImageInputDialog
          handleSubmit={handleSubmit}
          handleError={handleError}
          isOpen={imageDialogOpen}
          setOpen={setImageDialogOpen}
        />
        <MessageContentFieltd
          handleSubmit={handleSubmit}
          handleError={handleError}
        />
        <button className="p-1 group" type="submit">
          <SendIcon
            strokeWidth={0.5}
            size={28}
            className="group-hover:opacity-100 duration-200 stroke-card fill-primary"
          />
        </button>
      </form>
    </Form>
  );
};

export default ChatInput;
