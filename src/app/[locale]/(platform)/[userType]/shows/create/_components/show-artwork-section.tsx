import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateShowSchema } from "@/schema/showsSchema";
import { useFormContext } from "react-hook-form";
import FileInputDropzone from "./file-input-dropzone";

const ShowArtworkSection = () => {
  const form = useFormContext<CreateShowSchema>();
  return (
    <div className="bg-card-secondary border border-border-secondary shadow-[2px_2px_0px_0px_#302e3e] rounded-xl px-12 py-10 space-y-5">
      <h2 className="text-2xl pb-2">02. Show Artwork</h2>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FileInputDropzone file={field.value} setFile={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ShowArtworkSection;
