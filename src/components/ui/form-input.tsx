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
import { Input } from "./input";

interface PropsType<T extends FieldValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  name: keyof T;
  className?: string;
  label: string;
  labelClassName?: string | undefined;
  control: Control<T>;
  info?: string;
}

/**
 * FormInput component that renders an input field with a label, validation message, and support for different locales.
 *
 * @template T - The type of the field values used in the form.
 * @param {PropsType<T>} props - The properties passed to the component.
 * @returns {JSX.Element} The form input component.
 *
 * @example
 * ```tsx
 * <FormInput
 *   name="username"
 *   label="Username"
 *   control={control}
 * />
 * ```
 */
function FormInput<T extends FieldValues>({
  control,
  name,
  className: className,
  label,
  labelClassName,
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
        <FormItem className="w-full" dir={dir} ref={fieldRef}>
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
            <Input className={cn("w-full", className)} {...props} {...field} />
          </FormControl>
          <FormMessage className=" font-normal" />
        </FormItem>
      )}
    />
  );
}

export default FormInput;
