"use client";

// External imports
import React from "react";
import { useRouter } from "next/navigation";
import { BanknoteIcon, SquarePen } from "lucide-react";

// Local imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Price } from "@/types/podcaster";
import PricingCard from "../../pricings/_components/pricing-card";
import { Button } from "@/components/ui/button";

/**
 * Modal Component
 * Displays a modal dialog for editing pricing details.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 *
 * @returns {JSX.Element} The modal dialog component with a header and content.
 */
const VisitorsPricingModal = ({ pricings }: { pricings: Price | null }) => {
  const router = useRouter();
  const t = useTranslations("Index");

  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-center gap-5 opacity-75 hover:opacity-100 duration-200">
        <BanknoteIcon className="size-5" strokeWidth={3} />
        {t("prices")}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex">
            <DialogTitle className="text-3xl">{t("pricing")}</DialogTitle>
          </div>
          <div className="w-full py-2 flex gap-4 flex-col justify-start items-start">
            {/* Display the pricing cards with prices for different sections */}
            <PricingCard
              name="first"
              text={t("firstPodcast")}
              price={`$${pricings?.first}`}
            />
            <PricingCard
              name="middle"
              text={t("middle")}
              price={`$${pricings?.middle}`}
            />
            <PricingCard
              name="end"
              text={t("end")}
              price={`$${pricings?.end}`}
            />
            <PricingCard
              name="video"
              text={t("addingVideo")}
              price={`$${pricings?.video}`}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VisitorsPricingModal;
