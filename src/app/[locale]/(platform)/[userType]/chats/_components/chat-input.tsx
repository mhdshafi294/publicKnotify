"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ZodError } from "zod";

import TextareaAutosize from "react-textarea-autosize";
import { PaperclipIcon, SendHorizontalIcon } from "lucide-react";

import { MessageStoreSchema } from "@/schema/messageStoreSchema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ConversationMessage } from "@/types/conversation";
import { convertFileToURL } from "@/lib/utils";
import { storeMessageAction } from "@/app/actions/conversationsActions";

import MessageContentFieltd from "./message-content-fieltd";
import ChatImageInputDialog from "./chat-image-input-dialog";

/**
 * ChatInput Component
 *
 * This component renders an input field for sending chat messages, along with an image/file
 * upload button. It handles form validation, file uploads, and sending messages via mutation.
 * The input field supports autosizing for longer text and includes real-time message updates.
 *
 * @param {string | undefined} conversation_id - The ID of the conversation.
 * @param {string} type - The type of conversation (e.g., podcaster, user).
 * @param {ConversationMessage[]} newMessages - The current list of messages.
 * @param {React.Dispatch<React.SetStateAction<ConversationMessage[]>>} setNewMessages - Function to update the message list.
 * @returns {JSX.Element} The rendered chat input component.
 */
type ChatInputProps = {
  conversation_id: string | undefined;
  type: string;
  newMessages: ConversationMessage[];
  setNewMessages: React.Dispatch<React.SetStateAction<ConversationMessage[]>>;
};

const ChatInput: React.FC<ChatInputProps> = ({
  conversation_id,
  type,
  newMessages,
  setNewMessages,
}) => {
  const t = useTranslations("Index");
  const sendMessageSound = "/audio/send-message.mp3";

  const [isMounted, setIsMounted] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  // Form setup using react-hook-form and Zod schema validation
  const form = useForm<MessageStoreSchema>({
    resolver: zodResolver(MessageStoreSchema),
    defaultValues: {
      conversation_id: conversation_id,
      content: "",
      media: [],
    },
  });

  // Ensure the component is mounted only on the client
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset form when the conversation ID changes
  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation_id]);

  // Show image dialog when media is selected
  useEffect(() => {
    if (form.watch("media")?.length! > 0) {
      setImageDialogOpen(true);
    } else {
      setImageDialogOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("media")]);

  // Mutation for sending messages
  const { mutateAsync } = useMutation({
    mutationFn: storeMessageAction,
    onSuccess: () => {
      new Audio(sendMessageSound).play();
    },
    onError: (error) => {
      toast.dismiss();
      console.error("Error sending message:", error);
    },
  });

  // Form submission handler
  const handleSubmit = async (data: MessageStoreSchema) => {
    const id = new Date().getTime();

    // Create a new message with temporary values
    const newMessage: ConversationMessage = {
      id: id,
      content: data.content ? data.content : null,
      media: data.media.map((media) => convertFileToURL(media)) || [],
      is_sender: true,
      is_sending: true,
      seen_at: null,
      created_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };

    // Add the new message to the list (if no media is included)
    if (newMessage.media.length === 0) {
      setNewMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    form.reset();

    try {
      // Prepare form data for submission
      const formData = new FormData();
      formData.append("conversation_id", data.conversation_id);

      if (data.content) formData.append("content", data.content);
      if (data.media && data.media.length > 0) {
        data.media.forEach((media, index) => {
          formData.append(`media[${index}]`, media);
        });
      }

      // Submit the message via mutation
      await mutateAsync({ formData, type });

      // Update message status to sent
      setNewMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === id ? { ...message, is_sending: false } : message
        )
      );
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Zod validation error:", error.errors);
      } else {
        console.error("Error:", error);
      }
    }
  };

  // Error handler for form validation
  const handleError = (errors: any) => {
    console.error("Validation Errors:", errors);
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
        className="w-full absolute bottom-0 bg-card md:rounded-b-2xl flex items-center justify-between p-3"
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

        {/* Image Input Dialog */}
        <ChatImageInputDialog
          handleSubmit={handleSubmit}
          handleError={handleError}
          isOpen={imageDialogOpen}
          setOpen={setImageDialogOpen}
        />

        {/* Message Input Field */}
        <MessageContentFieltd
          handleSubmit={handleSubmit}
          handleError={handleError}
        />

        {/* Send Button */}
        <button className="p-1 group" type="submit">
          <SendHorizontalIcon
            strokeWidth={1}
            size={36}
            className="group-hover:scale-110 duration-200 stroke-card fill-primary"
          />
        </button>
      </form>
    </Form>
  );
};

export default ChatInput;
