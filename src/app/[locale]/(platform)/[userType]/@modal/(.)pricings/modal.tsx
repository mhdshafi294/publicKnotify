"use client";

// External imports
import React from "react";
import { useRouter } from "next/navigation";
import { SquarePen } from "lucide-react";

// Local imports
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import usePricingsStore from "@/store/edit-pricings-store";

/**
 * Modal Component
 * Displays a modal dialog for editing pricing details.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 *
 * @returns {JSX.Element} The modal dialog component with a header and content.
 */
const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const setEditMode = usePricingsStore((state) => state.setEditMode);

  return (
    <Dialog
      defaultOpen={true}
      open={true}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <div className="flex">
            <DialogTitle className="text-3xl">Pricings</DialogTitle>
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
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
