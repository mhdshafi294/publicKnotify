import { Button } from "@/components/ui/button";
import { CreateShowSchema } from "@/schema/showsSchema";
import { Upload } from "lucide-react";
import { useFormContext } from "react-hook-form";

const ShowArtworkSection = () => {
  const form = useFormContext<CreateShowSchema>();
  return (
    <div className="bg-background rounded-xl px-12 py-10 space-y-5">
      <h2 className="text-2xl pb-2">02. Show Artwork</h2>
      <div className="flex justify-start items-start gap-4">
        <div className="border border-dashed size-40 flex justify-center items-center shrink-0">
          <div className="flex flex-col gap-3 justify-center items-center">
            <Upload />
            <span className="text-sm">Drag File to Upload</span>
          </div>
        </div>
        <div className="w-full space-y-2">
          <h3 className="text-xl font-semibold">Upload Image</h3>
          <p className="text-foreground/80">
            We recommend using an image that is 3000px wide and we will
            automatically crop it to a square. You can skip this for now if you
            want but it will be required to publish.
          </p>
          <Button>choose file</Button>
        </div>
      </div>
    </div>
  );
};

export default ShowArtworkSection;
