"use client";
import { Button } from "@/components/ui/button";
import usePricingsStore from "@/store/edit-pricings-store";
import { SquarePen } from "lucide-react";

const PricePageHeader = () => {
  const setEditMode = usePricingsStore((state) => state.setEditMode);
  return (
    <div className="flex">
      <h2 className="text-3xl">Pricings</h2>
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
    </div>
  );
};

export default PricePageHeader;
