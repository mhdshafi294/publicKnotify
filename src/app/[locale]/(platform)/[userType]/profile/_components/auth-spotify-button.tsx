"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import SpotifyActiveAccountIcon from "@/components/icons/spotify-active-account-icon";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
// import { authSpotifyAction } from "@/app/actions/podcastActions";

/**
 * Button component for authenticating a Spotify account.
 *
 * Displays an icon indicating the Spotify authentication status.
 * If the account is not authenticated, clicking the button initiates
 * the authentication process. The button is disabled if an account
 * is already linked.
 *
 * @param {Object} props - Component props.
 * @param {string | null} [props.spotify_account] - The Spotify account status; if null, the account is not linked.
 *
 * @returns {JSX.Element} The rendered component.
 */
const AuthSpotifyButton: React.FC<{ spotify_account?: string | null }> = ({
  spotify_account,
}) => {
  const t = useTranslations("Index");
  const router = useRouter();

  // Mutation for authenticating with Spotify
  // const {
  //   mutate: server_authSpotifyAction,
  //   isPending: isPendingAuthSpotifyAction,
  // } = useMutation({
  //   mutationFn: authSpotifyAction,
  //   onSuccess: (data) => {
  //     if (data?.url) {
  //       router.push(data.url); // Redirect to Spotify authentication page
  //     } else {
  //       toast.error(t("authSpotifyError")); // Show error message if URL is not provided
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Spotify authentication error:", error); // Log the error
  //     toast.error(t("authSpotifyError")); // Show error message
  //   },
  // });

  // Handler for Spotify authentication button click
  // const handleAuthSpotify = async () => {
  //   server_authSpotifyAction(); // Initiate the authentication process
  // };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          asChild
          className="p-0 hover:bg-transparent"
          variant="ghost"
          size="icon"
          disabled={
            !!spotify_account
            // || isPendingAuthSpotifyAction
          }
          // onClick={handleAuthSpotify}
          aria-label={
            spotify_account ? t("deactivateSpotify") : t("activateSpotify")
          }
        >
          <SpotifyActiveAccountIcon
            className={cn("transition-opacity", {
              "opacity-75 hover:opacity-100": !!spotify_account,
            })}
          />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-fit border-card-foreground/10 text-xs p-2 opacity-60"
        side="top"
      >
        {spotify_account ? t("activated") : t("notActivatedYet")}
      </HoverCardContent>
    </HoverCard>
  );
};

export default AuthSpotifyButton;
