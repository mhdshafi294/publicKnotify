"use client";

import { getSelfStoriesAction } from "@/app/actions/storiesActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { SelfStoriesResponse } from "@/types/stories";
import { useQuery } from "@tanstack/react-query";
import {
  BoomBoxIcon,
  CircleFadingPlusIcon,
  ImagesIcon,
  PencilIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Fragment, useEffect, useState } from "react";

/**
 * A dropdown menu for the user to create a new story.
 *
 * @returns A dropdown menu component
 */
const SelfStoriesDropdownMenu = () => {
  const t = useTranslations("Index");
  const { data: session } = useSession();
  const {
    setStoryMediaDialogIsOpen: setIsMediaDialogOpen,
    setStoryTextDialogIsOpen: setIsTextDialogOpen,
    setIsStoryReviewDialogOpen: setIsReviewDialogOpen,
  } = useAddStoryDialogsStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isPending, isError } = useQuery<SelfStoriesResponse>({
    queryKey: ["self_stories", session?.user?.id],
    queryFn: () =>
      getSelfStoriesAction({
        type: session?.user?.type!,
      }),
    enabled: !!session?.user?.type && isMounted,
    // refetchInterval: 30000, // 30 seconds
  });

  if (!isMounted) return null; // Avoid rendering during SSR phase

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full items-center">
          <CircleFadingPlusIcon className="me-2 h-4 w-4" />
          <span>{t("add-story")}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex"
            onClick={() => {
              setIsMediaDialogOpen(true);
            }}
          >
            <ImagesIcon className="me-3 h-4 w-4" />
            <span>{t("photos-and-videos")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex"
            onClick={() => {
              setIsTextDialogOpen(true);
            }}
          >
            <PencilIcon className="me-3 h-4 w-4" />
            <span>{t("text")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {data?.stories && data?.stories?.length > 0 ? (
            <Fragment>
              <DropdownMenuItem
                className="flex"
                onClick={() => {
                  setIsReviewDialogOpen(true);
                }}
              >
                <BoomBoxIcon className="me-3 h-4 w-4" />
                <span>{t("your-active-stories")}</span>
              </DropdownMenuItem>
            </Fragment>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <AddStoryMediaDialog isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
    </Fragment>
  );
};

export default SelfStoriesDropdownMenu;
