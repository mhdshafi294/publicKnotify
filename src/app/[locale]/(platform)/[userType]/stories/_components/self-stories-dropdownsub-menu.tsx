"use client";

import { Fragment, useEffect, useState, Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { getSelfStoriesAction } from "@/app/actions/storiesActions";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { SelfStoriesResponse } from "@/types/stories";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BoomBoxIcon,
  CircleFadingPlusIcon,
  ImagesIcon,
  PencilIcon,
} from "lucide-react";

/**
 * SelfStoriesDropdownSubMenu Component
 * Renders a dropdown submenu for creating and managing user stories, with options
 * to add media, text, and view active stories if available.
 *
 * @param {Object} props - Component properties
 * @param {Dispatch<SetStateAction<boolean>>} props.setUserOptionDropdownMenu - Function to toggle the user option dropdown
 * @returns {JSX.Element | null} - A dropdown menu component or null during server-side rendering
 */
const SelfStoriesDropdownSubMenu: React.FC<{
  setUserOptionDropdownMenu: Dispatch<SetStateAction<boolean>>;
}> = ({ setUserOptionDropdownMenu }) => {
  const t = useTranslations("Index");
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  const {
    setStoryMediaDialogIsOpen: setIsMediaDialogOpen,
    setStoryTextDialogIsOpen: setIsTextDialogOpen,
    setIsStoryReviewDialogOpen: setIsReviewDialogOpen,
  } = useAddStoryDialogsStore();

  // Ensures component is mounted before rendering to avoid SSR issues
  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, [isMounted]);

  // Query to fetch the user's self-stories, enabled only when session data is available
  const { data, isPending, isError } = useQuery<SelfStoriesResponse>({
    queryKey: ["self_stories", session?.user?.id],
    queryFn: () =>
      getSelfStoriesAction({
        type: session?.user?.type!,
      }),
    enabled: !!session?.user?.type && isMounted,
    // refetchInterval: 30000, // Uncomment to refresh every 30 seconds
  });

  if (!isMounted) return null; // Prevents rendering during SSR

  return (
    <Fragment>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex w-full">
          <CircleFadingPlusIcon className="me-2 h-4 w-4" />
          <span>{t("add-story")}</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="rounded-2xl p-2">
          <DropdownMenuItem
            className="flex"
            onClick={() => {
              setUserOptionDropdownMenu(false);
              setIsMediaDialogOpen(true);
            }}
          >
            <ImagesIcon className="me-3 h-4 w-4" />
            <span>{t("photos-and-videos")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex"
            onClick={() => {
              setUserOptionDropdownMenu(false);
              setIsTextDialogOpen(true);
            }}
          >
            <PencilIcon className="me-3 h-4 w-4" />
            <span>{t("text")}</span>
          </DropdownMenuItem>
          {data?.stories && data.stories.length > 0 ? (
            <Fragment>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex"
                onClick={() => {
                  setUserOptionDropdownMenu(false);
                  setIsReviewDialogOpen(true);
                }}
              >
                <BoomBoxIcon className="me-3 h-4 w-4" />
                <span>{t("your-active-stories")}</span>
              </DropdownMenuItem>
            </Fragment>
          ) : null}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      {/* Placeholder for AddStoryMediaDialog or other dialog components */}
    </Fragment>
  );
};

export default SelfStoriesDropdownSubMenu;
