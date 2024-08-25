import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

const NewShowPage = () => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="max-w-screen-md bg-card-secondary border border-border-secondary shadow-[2px_2px_0px_0px_#302e3e] rounded-xl px-12 py-10 space-y-5">
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
            href="/podcaster/shows/create"
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
