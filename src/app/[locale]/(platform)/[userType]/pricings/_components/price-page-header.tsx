"use client";

// External Imports
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { useTranslations } from "next-intl";

// Internal Imports
import usePricingsStore from "@/store/edit-pricings-store";

/**
 * PricePageHeader Component
 * Displays the header for the pricing page, including a title and an edit button.
 *
 * @returns {JSX.Element} The header section with the pricing title and edit button.
 */
const PricePageHeader = () => {
  // Retrieve the function to set edit mode from the store
  const setEditMode = usePricingsStore((state) => state.setEditMode);

  // Get translations for the current locale
  const t = useTranslations("Index");

  return (
    <div className="flex">
      {/* Pricing page title */}
      <h2 className="text-3xl">{t("pricing")}</h2>

      {/* Edit button aligned to the right */}
      <div className="w-full flex justify-end items-center">
        <Button
          onClick={() => setEditMode(true)} // Enable edit mode when the button is clicked
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
