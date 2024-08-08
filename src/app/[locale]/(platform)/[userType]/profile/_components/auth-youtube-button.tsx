"use client";

import { authYoutubeAction } from "@/app/actions/podcastActions";
import YoutubeActiveAccountIcon from "@/components/icons/youtube-active-account-icon";
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
import { useTranslations } from "next-intl";

const AuthYoutubeButton = ({
  youtube_account,
}: {
  youtube_account?: string | null;
}) => {
  const t = useTranslations("Index");
  const router = useRouter();
  const {
    data: authYoutubeActionData,
    mutate: server_authYoutubeAction,
    isPending: isPendingAuthYoutubeAction,
  } = useMutation({
    mutationFn: authYoutubeAction,
    onSuccess: () => {
      router.push(authYoutubeActionData?.url!);
    },
    onError: (error) => {
      console.log(error);
      toast.error(t("authYoutubeError"));
    },
  });

  const handleAuthYoutube = async () => {
    server_authYoutubeAction();
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          asChild
          className="p-0 hover:bg-transparent"
          variant="ghost"
          size={"icon"}
          disabled={!!youtube_account || isPendingAuthYoutubeAction}
          onClick={handleAuthYoutube}
        >
          <YoutubeActiveAccountIcon
            className={cn("", {
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
