"use client";

import SpotifyActiveAccountIcon from "@/components/icons/spotify-active-account-icon";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const AuthSpotifyButton = ({
  spotify_account,
}: {
  spotify_account?: string | null;
}) => {
  // const router = useRouter();
  // const {
  //   data: authYoutubeActionData,
  //   mutate: server_authYoutubeAction,
  //   isPending: isPendingAuthYoutubeAction,
  // } = useMutation({
  //   mutationFn: authYoutubeAction,
  //   onSuccess: () => {
  //     router.push(authYoutubeActionData?.url!);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     toast.error("Something went wrong.please try again.");
  //   },
  // });

  // const handleAuthSpotify = async () => {
  //   server_authYoutubeAction();
  // };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          asChild
          className="p-0 hover:bg-transparent"
          variant="ghost"
          size={"icon"}
          disabled={!!spotify_account}
          // onClick={}
        >
          <SpotifyActiveAccountIcon
            className={cn("", {
              "opacity-75 hover:opacity-100": !!spotify_account,
            })}
          />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-fit border-card-foreground/10 text-xs p-2 opacity-60"
        side="top"
      >
        {spotify_account ? "Activated" : "Not Activated yet"}
      </HoverCardContent>
    </HoverCard>
  );
};

export default AuthSpotifyButton;
