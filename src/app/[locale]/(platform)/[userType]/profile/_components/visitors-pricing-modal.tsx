"use client";

// External imports
import React from "react";
import { useRouter } from "next/navigation";
import { BadgeAlertIcon, BanknoteIcon, SquarePen } from "lucide-react";

// Local imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import PricingCard from "../../pricings/_components/pricing-card";
import CheckGradientIcon from "@/components/icons/check-gradient-icon";
import { Price } from "@/types/profile";

/**
 * Modal Component
 * Displays a modal dialog for editing pricing details.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 *
 * @returns {JSX.Element} The modal dialog component with a header and content.
 */
const VisitorsPricingModal = ({ pricings }: { pricings: Price[] | null }) => {
  const router = useRouter();
  const t = useTranslations("Index");

  return (
    <Dialog>
      <DialogTrigger className="justify-center  hover:opacity-80  text-sm flex items-center gap-2 font-medium capitalize text-primary hover:text-greeny duration-200">
        {t("view")}
      </DialogTrigger>
      <DialogContent className="md:max-w-[80vw] md:w-[1200px] bg-white dark:bg-black border-none p-9">
        <DialogHeader>
          <div className="flex">
            <DialogTitle className="text-3xl">{t("pricing")}</DialogTitle>
          </div>
          <div className="w-full py-2 flex gap-4 flex-col justify-start items-start">
            {pricings?.length === 0 ? (
              <div className="w-full flex justify-center items-center gap-2">
                <BadgeAlertIcon />
                <p className="font-bold text-2xl italic">
                  {t("podcaster-did-not-published-prices-yet")}
                </p>
              </div>
            ) : null}
            {/* Display the pricing cards with prices for different sections */}
            {pricings?.map((item, index) => (
              <div key={item.id} className="space-y-5">
                <div className="flex items-center gap-2 ">
                  <div
                    style={{
                      backgroundImage: `linear-gradient(270deg, rgba(47, 234, 155, 0.15) 15.5%, rgba(127, 221, 83, 0.15) 85.5%)`,
                    }}
                    className="size-7 rounded-full flex justify-center items-center"
                  >
                    {index}
                  </div>
                  <h1 className="text-2xl font-semibold">{item.name.en}</h1>
                </div>
                <div className="w-full flex flex-wrap gap-5">
                  {item.sections.map((section) => (
                    <PricingCard
                      key={section.id}
                      name={section.name.en}
                      text={section.name.en}
                      price={section.podcaster_prices[0]?.price?.toString()}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VisitorsPricingModal;
