import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreateShowSchema } from "@/schema/showsSchema";
import { useFormContext } from "react-hook-form";

const FormatSection = () => {
  const form = useFormContext<CreateShowSchema>();

  const typeDescription =
    form.watch("type") === "all"
      ? "This is the default format with episodes presented and recommended from newest-to-oldest. This option is recommended for stand-alone episodes."
      : form.watch("type") === "mentions"
      ? "For Shows with episodes presented and recommended newest-to-oldest and grouped by seasons. This option is recommended for stand-alone episodes."
      : "For Shows with episodes presented and recommended oldest-to-newest and grouped by seasons. This option is recommended for narrative and storytelling formats.";

  return (
    <div className="bg-background rounded-xl px-12 py-10 space-y-5">
      <h2 className="text-2xl pb-2">03. Format</h2>
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-xl font-medium">Show Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="all" />
                  </FormControl>
                  <FormLabel className="font-normal text-base">
                    Episodic
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="mentions" />
                  </FormControl>
                  <FormLabel className="font-normal text-base">
                    Episodic with Seasons
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="none" />
                  </FormControl>
                  <FormLabel className="font-normal text-base">
                    Serial
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormDescription className="text-base text-foreground/50">
              {typeDescription}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormatSection;