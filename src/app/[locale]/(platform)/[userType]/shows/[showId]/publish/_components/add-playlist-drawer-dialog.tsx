"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { PlusIcon } from "lucide-react";
import AddPlaylistForm from "./add-playlist-form";

/**
 * Component for adding a new playlist using a responsive dialog or drawer.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * ```tsx
 * <DrawerDialogAddNewPlaylist />
 * ```
 */
const DrawerDialogAddNewPlaylist: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const t = useTranslations("Index");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full border-t border-card-foreground/30 rounded-none"
          >
            <PlusIcon className="me-2 size-4" /> {t("createPlaylistButton")}
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:!max-w-[50vw] bg-card border-card-foreground/10">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {t("createPlaylistTitle")}
            </DialogTitle>
          </DialogHeader>
          <AddPlaylistForm open={open} onOpenChange={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="w-full border-t border-card-foreground/30 rounded-none"
        >
          <PlusIcon className="me-2 size-4" />
          {t("createPlaylistButton")}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-card border-card-foreground/10">
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex">{t("createPlaylistTitle")}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <AddPlaylistForm open={open} onOpenChange={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDialogAddNewPlaylist;
