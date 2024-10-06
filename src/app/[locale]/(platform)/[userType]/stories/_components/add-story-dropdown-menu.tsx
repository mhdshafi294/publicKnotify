"use client";

import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleFadingPlusIcon, ImagesIcon, PencilIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, Fragment, SetStateAction } from "react";

const AddStoryDropdownMenu = ({
  isOpen,
  setIsMediaDialogOpen,
  setIsTextDialogOpen,
  setUserOptionDropdownMenu,
}: {
  isOpen?: boolean;
  setIsMediaDialogOpen: Dispatch<SetStateAction<boolean>>;
  setIsTextDialogOpen: Dispatch<SetStateAction<boolean>>;
  setUserOptionDropdownMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  const t = useTranslations("Index");

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
              setIsMediaDialogOpen(true);
              setUserOptionDropdownMenu(false);
            }}
          >
            <ImagesIcon className="me-3 h-4 w-4" />
            <span>{t("photos-and-videos")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex"
            onClick={() => {
              setIsTextDialogOpen(true);
              setUserOptionDropdownMenu(false);
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

export default AddStoryDropdownMenu;
