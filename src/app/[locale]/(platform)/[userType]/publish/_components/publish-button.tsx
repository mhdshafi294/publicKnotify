"use client";

import {
  publishPodcastAction,
  publishYoutubeAction,
} from "@/app/actions/podcastActions";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { useRouter } from "@/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BadgeInfoIcon, CloudIcon, Router } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Props {
  podcast_id: string;
  disabled?: boolean;
  className?: string;
  selectedPlatform: string[];
}

const PublishButton: React.FC<Props> = ({
  podcast_id,
  disabled,
  className,
  selectedPlatform,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: publishPodcastActionData,
    mutate: server_publishPodcastAction,
    isPending: publishPodcastActionIsPending,
    isError: publishPodcastActionIsError,
    error: publishPodcastActionError,
  } = useMutation({
    mutationFn: publishPodcastAction,
    onMutate: () => {
      toast.loading("Publishing podcast...");
    },
    onSuccess: () => {
      toast.dismiss();

      toast.success("Podcast published successfully");
      queryClient.invalidateQueries({ queryKey: ["podcastsDrafts"] });
      router.push(`podcast/${podcast_id}`);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Publish failed. Please try again!");
      console.log(publishPodcastActionError);
    },
  });

  const {
    data: publishYoutubeActionData,
    mutate: server_publishYoutubeAction,
    isPending: publishYoutubeActionIsPending,
    isError: publishYoutubeActionIsError,
    error: publishYoutubeActionError,
  } = useMutation({
    mutationFn: publishYoutubeAction,
    onMutate: () => {
      toast.loading("Publishing podcast...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Podcast published successfully");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Publish failed. Please try again!");
      console.log(publishYoutubeActionError);
    },
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button
              disabled={
                publishPodcastActionIsPending ||
                publishYoutubeActionIsPending ||
                publishPodcastActionIsError ||
                publishYoutubeActionIsError ||
                disabled
              }
              className={cn("capitalize mt-0 text-sm", className)}
              type="button"
              onClick={() => {
                server_publishPodcastAction({
                  id: podcast_id,
                  type: "podcaster",
                });
                if (selectedPlatform?.includes("youtube")) {
                  console.log("share to youtube");
                  server_publishYoutubeAction({
                    id: podcast_id,
                    type: "podcaster",
                  });
                }
              }}
            >
              <Router className="size-4 mr-1.5" />
              {publishPodcastActionIsPending ||
              publishYoutubeActionIsPending ||
              publishPodcastActionIsError ||
              publishYoutubeActionIsError ? (
                <ButtonLoader />
              ) : (
                "Publish"
              )}
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
