import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plan } from "@/types/plan";
import { Session } from "next-auth";
import PayPlanButton from "./pay-plan-button";

type PlanCardProps = Plan & {
  playlist_id: string;
  session: Session;
};

const PlanCard: React.FC<PlanCardProps> = async ({ ...props }) => {
  const locale = await getLocale();
  const t = await getTranslations("Index");
  // Fetching the current session using NextAuth's getServerSession

  return (
    <div
      className={cn(
        "p-7 w-[420px] min-h-[480px] bg-white dark:bg-[#121212] rounded-[20px] flex flex-col gap-4 shadow-[0px_12.71px_42.37px_#1ED76014]",
        { "border-4 border-[#0E672E]": props.best_deal }
      )}
    >
      <div
        className={cn(
          "text-xs text-[#003480] border border-[#003480] py-2 px-3 rounded flex justify-center items-center w-fit",
          {
            "border-greeny text-greeny": props.is_active,
          }
        )}
      >
        {props.is_active ? "Active Plan" : "Avialable Plan"}
      </div>
      <h2 className="font-bold text-xl">
        {props.translations.find((t) => t.locale === locale)?.name}
      </h2>
      <div className="space-y-1">
        <p className="text-xs opacity-85">
          ${props.monthly_price}/{t("Month")}
        </p>
        <p className="text-sm opacity-90">
          ${props.annual_price}/{t("Annual")}
        </p>
      </div>
      <Separator className="my-3" />
      <ul className="space-y-2 mb-7">
        {props.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-sm opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="size-8 stroke-[#1ED760]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      {/* <p className="">
        {props.translations.find((t) => t.locale === locale)?.description}
      </p> */}
      <div className="mt-auto justify-self-end space-y-2">
        {/* <PayPlanButton
          playlist_id={props.playlist_id}
          plan_id={props.id.toString()}
          best_deal={props.best_deal}
        /> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={props.best_deal ? "default" : "outline"}
              className={cn(
                "w-full text-xl gap-2 items-center font-bold  rounded-full",
                { "bg-[#1ED760] hover:bg-[#1ED760]/90": props.best_deal }
              )}
              size="lg"
            >
              {t("subsicribe")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
            </DialogHeader>
            <PayPlanButton
              playlist_id={props.playlist_id}
              plan_id={props.id.toString()}
              best_deal={props.best_deal}
              session={props.session}
            />
            <PayPlanButton
              playlist_id={props.playlist_id}
              plan_id={props.id.toString()}
              best_deal={props.best_deal}
              session={props.session}
              annual
            />
          </DialogContent>
        </Dialog>

        <div className="w-fit">
          <p className="text-xs opacity-80">
            {t("terms-and-conditions-apply")}
          </p>
          <div className="h-px w-full bg-foreground opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
