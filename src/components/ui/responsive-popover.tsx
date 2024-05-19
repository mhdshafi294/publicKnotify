import { FC, ReactNode } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

import { Popover, PopoverContent } from "./popover";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "./separator";

type PropsType = {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  description?: string;
  children: ReactNode;
};

const ResponsivePopover: FC<PropsType> = ({
  title,
  description,
  children,
  open,
  setOpen,
}) => {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverContent className="sm:max-w-[475px]">
          <h5 className="capitalize">{title}</h5>
          {description ? <p>{description}</p> : null}
          <Separator />
          {children}
        </PopoverContent>
      </Popover>
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

export default ResponsivePopover;
