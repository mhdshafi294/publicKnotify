"use client";

import { publishPodcastAction } from "@/app/actions/podcastActions";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { useRouter } from "@/navigation";
import { useMutation } from "@tanstack/react-query";
import { BadgeInfoIcon, CloudIcon, Router } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  podcast_id: string;
  disabled?: boolean;
}

const PublishButton: React.FC<Props> = ({ podcast_id, disabled }) => {
  const router = useRouter();

  const {
    data,
    mutate: server_publishPodcastAction,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: publishPodcastAction,
    onMutate: () => {
      toast.loading("Publishing podcast...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Podcast published successfully");
      // TODO: redirect to podcast page
      // router.push(`/${router.query.userType}/podcasts`);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Publish failed. Please try again!");
      console.log(error);
    },
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button
              disabled={isPending || isError || disabled}
              className="capitalize mt-0 text-sm"
              type="button"
              onClick={() =>
                server_publishPodcastAction({
                  id: podcast_id,
                  type: "podcaster",
                })
              }
            >
              <Router className="size-4 mr-1.5" />
              {isPending || isError ? <ButtonLoader /> : "Publish"}
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-1">
          <BadgeInfoIcon size={16} />
          <p className="font-medium text-base">
            Ensure that you uploaded your podcast
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PublishButton;
