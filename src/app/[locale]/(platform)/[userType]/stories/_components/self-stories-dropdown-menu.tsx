"use client";

import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { getSelfStoriesAction } from "@/app/actions/storiesActions";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { SelfStoriesResponse } from "@/types/stories";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BoomBoxIcon,
  CircleFadingPlusIcon,
  ImagesIcon,
  PencilIcon,
} from "lucide-react";

/**
 * SelfStoriesDropdownMenu Component
 * Renders a dropdown menu for the user to create a new story, with options to add media or text,
 * and view their active stories if available.
 *
 * @returns {JSX.Element | null} - A dropdown menu component or null during server-side rendering.
 */
const SelfStoriesDropdownMenu: React.FC = () => {
  const t = useTranslations("Index");
  const { data: session } = useSession();

  const {
    setStoryMediaDialogIsOpen: setIsMediaDialogOpen,
    setStoryTextDialogIsOpen: setIsTextDialogOpen,
    setIsStoryReviewDialogOpen: setIsReviewDialogOpen,
  } = useAddStoryDialogsStore();

  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component only renders on the client-side
  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, [isMounted]);

  const { data, isPending, isError } = useQuery<SelfStoriesResponse>({
    queryKey: ["self_stories", session?.user?.id],
    queryFn: () =>
      getSelfStoriesAction({
        type: session?.user?.type!,
      }),
    enabled: !!session?.user?.type && isMounted,
    // refetchInterval: 30000, // Optionally refresh data every 30 seconds
  });

  if (!isMounted) return null; // Prevent rendering during SSR

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
          {data?.stories && data.stories.length > 0 ? (
            <DropdownMenuItem
              className="flex"
              onClick={() => {
                setIsReviewDialogOpen(true);
              }}
            >
              <BoomBoxIcon className="me-3 h-4 w-4" />
              <span>{t("your-active-stories")}</span>
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Placeholder for AddStoryMediaDialog or other dialog components */}
    </Fragment>
  );
};

export default SelfStoriesDropdownMenu;
