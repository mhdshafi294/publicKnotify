import { FC, ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

type PropsType = {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  description?: string;
  children: ReactNode;
};

const ResponsiveDialog: FC<PropsType> = ({
  title,
  description,
  children,
  open,
  setOpen,
}) => {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle className="capitalize">{title}</DialogTitle>
            {description ? (
              <DialogDescription>{description}</DialogDescription>
            ) : null}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-start capitalize">
          <DrawerTitle>{title}</DrawerTitle>
          {description ? (
            <DrawerDescription>{description}</DrawerDescription>
          ) : null}
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;
