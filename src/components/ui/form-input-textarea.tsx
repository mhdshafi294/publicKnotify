import { useLocale } from "next-intl";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import {
  Control,
  FieldValues,
  useFormContext,
  useFormState,
} from "react-hook-form";

import { cn, getDirection } from "@/lib/utils";
import { BadgeInfoIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Textarea } from "./textarea";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  label: string;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
  control: Control<T>;
  info?: string;
}

/**
 * FormInputTextarea component that renders a textarea field within a form.
 *
 * @param {PropsType<T>} props - The properties passed to the component.
 * @returns {JSX.Element} The form input textarea component.
 *
 * @example
 * ```tsx
 * <FormInputTextarea
 *   name="description"
 *   label="Description"
 *   placeholder="Enter description"
 *   control={control}
 * />
 * ```
 */
function FormInputTextarea<T extends FieldValues>({
  control,
  name,
  className: className,
  label,
  labelClassName,
  placeholder,
  info,
  ...props
}: PropsType<T>) {
  const locale = useLocale();
  const dir = getDirection(locale);

  const { setFocus } = useFormContext();

  const fieldRef = useRef<HTMLDivElement | null>(null); // Ref for the field
  const { errors } = useFormState(); // Get the validation errors

  useEffect(() => {
    if (errors[name as keyof FieldValues]) {
      fieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setFocus(name.toString());
    }
  }, [errors, name, setFocus]);

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name.toString()}
      render={({ field }) => (
        <FormItem dir={dir} ref={fieldRef}>
          <div className="flex items-baseline gap-2">
            <FormLabel className={cn("capitalize text-lg", labelClassName)}>
              {label}
            </FormLabel>
            {info ? (
              <HoverCard>
                <HoverCardTrigger>
                  <BadgeInfoIcon className="size-4 text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="border border-border-secondary/20 bg-card/80 text-sm">
                  {info}
                </HoverCardContent>
              </HoverCard>
            ) : null}
          </div>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn("resize-none", className)}
              {...field}
            />
          </FormControl>
          <FormMessage className=" font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormInputTextarea;
