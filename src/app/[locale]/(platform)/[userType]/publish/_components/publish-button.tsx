"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { BadgeInfoIcon, Router } from "lucide-react";

import {
  publishPodcastAction,
  publishYoutubeAction,
} from "@/app/actions/podcastActions";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PublishButtonProps {
  podcast_id: string;
  disabled?: boolean;
  className?: string;
  selectedPlatform: string[];
}

/**
 * PublishButton component that handles the publishing of podcasts to selected platforms.
 *
 * @param {PublishButtonProps} props - The properties passed to the component.
 * @returns {JSX.Element} The PublishButton component.
 *
 * @example
 * ```tsx
 * <PublishButton
 *   podcast_id="123"
 *   disabled={false}
 *   className="my-custom-class"
 *   selectedPlatform={["web", "youtube"]}
 * />
 * ```
 */
const PublishButton: React.FC<PublishButtonProps> = ({
  podcast_id,
  disabled,
  className,
  selectedPlatform,
}) => {
  const t = useTranslations("Index");
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
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
      console.error(publishPodcastActionError);
    },
  });

  const {
    mutate: server_publishYoutubeAction,
    isPending: publishYoutubeActionIsPending,
    isError: publishYoutubeActionIsError,
    error: publishYoutubeActionError,
  } = useMutation({
    mutationFn: publishYoutubeAction,
    onMutate: () => {
      toast.loading(t("publishingPodcast"));
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(t("podcastPublished"));
    },
    onError: () => {
      toast.dismiss();
      toast.error(t("publishFailed"));
      console.error(publishYoutubeActionError);
    },
  });

  const handlePublish = () => {
    server_publishPodcastAction({
      id: podcast_id,
      type: "podcaster",
    });

    if (selectedPlatform.includes("youtube")) {
      server_publishYoutubeAction({
        id: podcast_id,
        type: "podcaster",
      });
    }
  };

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
              onClick={handlePublish}
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
