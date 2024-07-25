"ues client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
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
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusIcon } from "lucide-react";
import AddPlaylistForm from "./add-playlist-form";

const DrawerDialogAddNewPlaylist = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full border-t border-card-foreground/30 rounded-none"
          >
            <PlusIcon className="mr-2 size-4" /> Create a new playlist
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:!max-w-[50vw] bg-card border-card-foreground/10">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              Create a new playlist
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
          <PlusIcon className="mr-2 size-4" />
          Create a new playlist
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-card border-card-foreground/10">
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex">Create a new playlist</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <AddPlaylistForm open={open} onOpenChange={setOpen} />
        </div>
        {/* <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDialogAddNewPlaylist;
