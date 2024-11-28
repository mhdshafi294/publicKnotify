"use client";

// External imports
import { PieChartIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

// Local imports
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Statistics } from "@/types/podcaster";
import { useTranslations } from "next-intl";
import PricingCard from "../../pricings/_components/pricing-card";
import TrendingUpGradientIcon from "@/components/icons/trending-up-gradient-icon";

/**
 * Modal Component
 * Displays a modal dialog for editing pricing details.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 *
 * @returns {JSX.Element} The modal dialog component with a header and content.
 */
const VisitorsStatisticsModal = ({
  statistics,
  profileId,
}: {
  statistics: Statistics | null;
  profileId: number;
}) => {
  const router = useRouter();
  const t = useTranslations("Index");

  return (
    <Dialog>
      <DialogTrigger className="justify-center  hover:opacity-80  text-sm flex items-center gap-2 font-medium capitalize text-primary hover:text-greeny duration-200">
        {t("view")}
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-black border-none p-9">
        <DialogHeader>
          <div className="w-full flex justify-between">
            <DialogTitle className="text-3xl">{t("statistics")}</DialogTitle>
            <Link
              href={`/company/shows_stats?podcaster_id=${profileId}`}
              className="flex items-center gap-2 opacity-85 hover:opacity-100 duration-200"
            >
              <SquareArrowOutUpRightIcon className="size-4" strokeWidth={3} />
              More detailed stats
            </Link>
          </div>
          <div className="w-full py-7 flex gap-7 flex-col justify-start items-start">
            {/* Display the pricing cards with prices for different sections */}
            {statistics?.average_listeners ? (
              <PricingCard
                name="first"
                text={t("averageNumberOfListeners")}
                price={parseFloat(statistics?.average_listeners)
                  ?.toFixed(3)
                  .toString()}
              />
            ) : null}
            {statistics?.podcsats_count ? (
              <PricingCard
                name="middle"
                text={t("podcsatsCount")}
                price={statistics?.podcsats_count.toString()}
              />
            ) : null}
            {statistics?.youtube ? (
              <PricingCard
                name="end"
                text={t("youtubeViewsCount")}
                price={statistics?.youtube.viewCount.toString()}
              />
            ) : null}
            <Link
              href={`/company/shows_stats?podcaster_id=${profileId}`}
              className={cn(
                buttonVariants({
                  variant: "default",
                  className:
                    "w-full flex justify-center items-center gap-2 font-semibold text-lg rounded-lg",
                })
              )}
            >
              {t("more-detailed-stats")}
              <SquareArrowOutUpRightIcon className="size-4" strokeWidth={3} />
            </Link>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VisitorsStatisticsModal;
