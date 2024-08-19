import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

const NewShowPage = () => {
  return (
    <div className="flex-1 flex justify-center items-center bg-[#034843]">
      <div className="w-full space-y-6 max-w-screen-md bg-background py-8 px-20 rounded-xl">
        <h2 className="text-6xl leading-tight font-semibold">
          Let’s get started by adding a show
        </h2>
        <p className="text-xl">
          Whether you’re starting from scratch or importing from another
          platform,we’ve got you covered
        </p>
        <div className="flex justify-center items-center gap-4">
          <Button
            size="lg"
            className="font-bold text-lg w-full bg-greeny hover:bg-greeny/90"
          >
            Import Existing Show
          </Button>
          <Link
            href="/podcaster/shows/1/create"
            className={cn(
              buttonVariants({
                size: "lg",
                className: "font-bold text-lg w-full",
              })
            )}
          >
            Start from scratch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewShowPage;
