"use client";

import {
  publishPodcastAction,
  publishYoutubeAction,
} from "@/app/actions/podcastActions";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { useRouter } from "@/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BadgeInfoIcon, Router } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Index");
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
      toast.loading(t("publishingPodcast"));
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(t("podcastPublished"));
      queryClient.invalidateQueries({ queryKey: ["podcastsDrafts"] });
      router.push(`podcast/${podcast_id}`);
    },
    onError: () => {
      toast.dismiss();
      toast.error(t("publishFailed"));
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
      toast.loading(t("publishingPodcast"));
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(t("podcastPublished"));
    },
    onError: () => {
      toast.dismiss();
      toast.error(t("publishFailed"));
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
              <Router className="size-4 me-1.5" />
              {publishPodcastActionIsPending ||
              publishYoutubeActionIsPending ||
              publishPodcastActionIsError ||
              publishYoutubeActionIsError ? (
                <ButtonLoader />
              ) : (
                t("publishButton")
              )}
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-1">
          <BadgeInfoIcon size={16} />
          <p className="font-medium text-base">{t("tooltipMessage")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PublishButton;
