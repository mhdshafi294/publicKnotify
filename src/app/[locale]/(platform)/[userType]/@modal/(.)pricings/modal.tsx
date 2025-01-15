"use client";

// External imports
import { SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// Local imports
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getDirection } from "@/lib/utils";
import usePricingsStore from "@/store/use-edit-pricings-store";
import { useLocale, useTranslations } from "next-intl";

/**
 * Modal Component
 * Displays a modal dialog for editing pricing details.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 *
 * @returns {JSX.Element} The modal dialog component with a header and content.
 */
const SelfPricingModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const setEditMode = usePricingsStore((state) => state.setEditMode);
  const t = useTranslations("Index");
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <Dialog
      defaultOpen={true}
      open={true}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="md:max-w-[80vw] md:w-[1200px] bg-white dark:bg-black border-none p-9">
        <ScrollArea className="max-h-[calc(100vh-200px)]" dir={dir}>
          <DialogHeader>
            <div className="flex">
              <DialogTitle className="text-3xl">{t("pricing")}</DialogTitle>
              <DialogDescription asChild>
                <div className="w-full flex justify-end items-center">
                  <Button
                    onClick={() => setEditMode(true)}
                    className="hover:bg-transparent hover:text-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <SquarePen />
                  </Button>
                </div>
              </DialogDescription>
            </div>
            {children}
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SelfPricingModal;
