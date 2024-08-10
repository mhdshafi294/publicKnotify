"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { authYoutubeAction } from "@/app/actions/podcastActions";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import YoutubeActiveAccountIcon from "@/components/icons/youtube-active-account-icon";
import { cn } from "@/lib/utils";

/**
 * Button component for authenticating a YouTube account.
 *
 * Displays an icon indicating the YouTube authentication status.
 * If the account is not authenticated, clicking the button initiates
 * the authentication process. The button is disabled if an account
 * is already linked or the authentication request is in progress.
 *
 * @param {Object} props - Component props.
 * @param {string | null} [props.youtube_account] - The YouTube account status; if null, the account is not linked.
 *
 * @returns {JSX.Element} The rendered component.
 */
const AuthYoutubeButton: React.FC<{ youtube_account?: string | null }> = ({
  youtube_account,
}) => {
  const t = useTranslations("Index");
  const router = useRouter();

  // Mutation for authenticating with YouTube
  const {
    mutate: server_authYoutubeAction,
    isPending: isPendingAuthYoutubeAction,
  } = useMutation({
    mutationFn: authYoutubeAction,
    onSuccess: (data) => {
      if (data?.url) {
        router.push(data.url); // Redirect to YouTube authentication page
      } else {
        toast.error(t("authYoutubeError")); // Show error message if URL is not provided
      }
    },
    onError: (error) => {
      console.error("YouTube authentication error:", error); // Log the error
      toast.error(t("authYoutubeError")); // Show error message
    },
  });

  // Handler for YouTube authentication button click
  const handleAuthYoutube = async () => {
    server_authYoutubeAction(); // Initiate the authentication process
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          asChild
          className="p-0 hover:bg-transparent"
          variant="ghost"
          size="icon"
          disabled={!!youtube_account || isPendingAuthYoutubeAction}
          onClick={handleAuthYoutube}
          aria-label={
            youtube_account ? t("deactivateYouTube") : t("activateYouTube")
          }
        >
          <YoutubeActiveAccountIcon
            className={cn("transition-opacity", {
              "opacity-75 hover:opacity-100": !!youtube_account,
            })}
          />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-fit border-card-foreground/10 text-xs p-2 opacity-60"
        side="top"
      >
        {youtube_account ? t("activated") : t("notActivatedYet")}
      </HoverCardContent>
    </HoverCard>
  );
};

export default AuthYoutubeButton;
