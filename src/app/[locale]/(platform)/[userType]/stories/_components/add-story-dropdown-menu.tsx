"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { CircleFadingPlusIcon, ImagesIcon, PencilIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

const AddStoryDropdownMenu = () => {
  const t = useTranslations("Index");
  const setIsMediaDialogOpen = useAddStoryDialogsStore(
    (state) => state.setStoryMediaDialogIsOpen
  );
  const setIsTextDialogOpen = useAddStoryDialogsStore(
    (state) => state.setStoryTextDialogIsOpen
  );

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
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <AddStoryMediaDialog isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
    </Fragment>
  );
};

export default AddStoryDropdownMenu;
