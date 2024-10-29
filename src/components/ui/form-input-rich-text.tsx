"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Control, FieldValues, Path } from "react-hook-form";
import { useLocale } from "next-intl";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn, getDirection } from "@/lib/utils";
import {
  BoldIcon,
  HeadingIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";
import { Button } from "./button";
import { Separator } from "./separator";

/**
 * MenuBar component for RichText editor
 *
 * A component that wraps all the editor menu buttons
 *
 * @param {Object} editor - The editor object
 * @returns {ReactNode} - The rendered component
 */
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="p-1 flex items-center justify-between border border-input rounded-t-lg">
      <div className="flex items-center flex-wrap">
        <Button
          variant={editor.isActive("bold") ? "default" : "ghost"}
          size={"icon"}
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn()}
        >
          <BoldIcon size={20} />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("italic") ? "default" : "ghost"}
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon size={20} />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("underline") ? "default" : "ghost"}
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={20} />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("strike") ? "default" : "ghost"}
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon size={20} />
        </Button>
        <Button
          size="icon"
          variant={
            editor.isActive("heading", { level: 2 }) ? "default" : "ghost"
          }
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <HeadingIcon size={20} />
        </Button>
        <Button
          size="icon"
          variant={
            editor.isActive("heading", { level: 3 }) ? "default" : "ghost"
          }
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <HeadingIcon size={16} />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("blockquote") ? "default" : "ghost"}
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <QuoteIcon size={18} />
        </Button>
        <Separator orientation="vertical" className="h-7 bg-input" />
        <Button
          size="icon"
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListIcon size={20} />
        </Button>
        <Button
          size="icon"
          variant={editor.isActive("orderedList") ? "default" : "ghost"}
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrderedIcon size={20} />
        </Button>
      </div>
      <div className="flex justify-end gap-1">
        <Button
          size="icon"
          variant="ghost"
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoIcon size={20} />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoIcon size={20} />
        </Button>
      </div>
    </div>
  );
};

interface PropsType<T extends FieldValues> {
  name: Path<T>; // Use `Path` instead of `keyof`
  label: string;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
  control: Control<T>;
}

/**
 * FormInputRichText component that renders a rich text editor within a form.
 *
 * @template T - The type of the field values used in the form.
 * @param {PropsType<T>} props - The properties passed to the component.
 * @param {Control<T>} props.control - The control object from react-hook-form.
 * @param {Path<T>} props.name - The name of the form field.
 * @param {string} [props.className] - Optional additional class names for the editor.
 * @param {string} props.label - The label for the form field.
 * @param {string} [props.labelClassName] - Optional additional class names for the label.
 * @param {string} [props.placeholder] - Optional placeholder text for the editor.
 * @returns {JSX.Element} The rendered FormInputRichText component.
 *
 * @example
 * ```tsx
 * <FormInputRichText
 *   name="content"
 *   label="Content"
 *   control={control}
 * />
 * ```
 */
function FormInputRichText<T extends FieldValues>({
  control,
  name,
  className,
  label,
  labelClassName,
  placeholder,
  ...props
}: PropsType<T>) {
  const locale = useLocale();
  const dir = getDirection(locale);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    immediatelyRender: false,
    content: control._formValues[name] || "", // Empty string by default
    editorProps: {
      attributes: {
        class: cn(
          "w-full text-white bg-background rounded-b-lg border border-input  min-h-[200px] p-4 prose prose-p:text-white prose-strong:text-white prose-blockquote:text-white prose-headings:text-white max-w-full",
          className
        ),
        dir,
      },
    },
  });
  useEffect(() => {
    if (editor) {
      // Initialize content with field value
      editor.commands.setContent(control._formValues[name]);

      // Listen for content updates and trigger field.onChange
      editor.on("update", () => {
        control._formValues[name] = editor.getHTML();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, control, name, control._formValues[name]]);

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name}
      render={({ field }) => (
        <FormItem dir={dir}>
          <FormLabel className={cn("capitalize text-lg", labelClassName)}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="w-full bg-background rounded-lg">
              <MenuBar editor={editor} />
              <EditorContent editor={editor} />
            </div>
          </FormControl>
          <FormMessage className="capitalize font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormInputRichText;
