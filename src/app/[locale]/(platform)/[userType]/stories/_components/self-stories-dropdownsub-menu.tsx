"use client";

import { getSelfStoriesAction } from "@/app/actions/storiesActions";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { SelfStoriesResponse } from "@/types/stories";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BoomBoxIcon,
  CircleFadingPlusIcon,
  ImagesIcon,
  PencilIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Dispatch, Fragment, SetStateAction } from "react";

const SelfStoriesDropdownSubMenu = ({
  setUserOptionDropdownMenu,
}: {
  setUserOptionDropdownMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  const t = useTranslations("Index");
  const { data: session } = useSession();

  const {
    setStoryMediaDialogIsOpen: setIsMediaDialogOpen,
    setStoryTextDialogIsOpen: setIsTextDialogOpen,
    setIsStoryReviewDialogOpen: setIsReviewDialogOpen,
  } = useAddStoryDialogsStore();

  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery<SelfStoriesResponse>({
    queryKey: ["self_stories", session?.user?.id],
    queryFn: () =>
      getSelfStoriesAction({
        type: session?.user?.type!,
      }),
    enabled: !!session?.user?.type,
    // refetchInterval: 30000, // 30 seconds
  });

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
          {data?.stories && data?.stories?.length > 0 ? (
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
      {/* <AddStoryMediaDialog isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
    </Fragment>
  );
};

export default SelfStoriesDropdownSubMenu;
