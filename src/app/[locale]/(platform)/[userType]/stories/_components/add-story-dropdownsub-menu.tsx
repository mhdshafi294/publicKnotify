"use client";

import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import useAddStoryDialogsStore from "@/store/use-add-story-dialogs-store";
import { CircleFadingPlusIcon, ImagesIcon, PencilIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, Fragment, SetStateAction } from "react";

const AddStoryDropdownMenuSub = ({
  setUserOptionDropdownMenu,
}: {
  setUserOptionDropdownMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  const t = useTranslations("Index");
  const setIsMediaDialogOpen = useAddStoryDialogsStore(
    (state) => state.setStoryMediaDialogIsOpen
  );
  const setIsTextDialogOpen = useAddStoryDialogsStore(
    (state) => state.setStoryTextDialogIsOpen
  );

  return (
    <Fragment>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex w-full">
          <CircleFadingPlusIcon className="me-2 h-4 w-4" />
          <span>{t("add-story")}</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
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
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      {/* <AddStoryMediaDialog isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
    </Fragment>
  );
};

export default AddStoryDropdownMenuSub;
