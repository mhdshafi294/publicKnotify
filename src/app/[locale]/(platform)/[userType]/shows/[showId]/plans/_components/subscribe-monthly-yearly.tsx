import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { getTranslations } from "next-intl/server";
import PayPlanButton from "./pay-plan-button";

type SubscribeMonthlyYearlyProps = {
  playlist_id: string;
  id: number;
  best_deal: boolean;
  session: Session;
};

const SubscribeMonthlyYearly: React.FC<SubscribeMonthlyYearlyProps> = async ({
  playlist_id,
  id,
  best_deal,
  session,
}) => {
  const t = await getTranslations("Index");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={best_deal ? "default" : "outline"}
          className={cn(
            "w-full text-xl gap-2 items-center font-bold  rounded-full",
            { "bg-[#1ED760] hover:bg-[#1ED760]/90": best_deal }
          )}
          size="lg"
        >
          {t("subsicribe")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("go-for-a-month-or-get-a-much-better-deal-going-for-a-year")}
          </DialogTitle>
        </DialogHeader>
        <PayPlanButton
          playlist_id={playlist_id}
          plan_id={id.toString()}
          best_deal={best_deal}
          session={session}
        />
        <PayPlanButton
          playlist_id={playlist_id}
          plan_id={id.toString()}
          best_deal={best_deal}
          session={session}
          annual
        />
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeMonthlyYearly;
