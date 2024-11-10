import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plan } from "@/types/plan";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";
import PayPlanButton from "./pay-plan-button";

type PlanCardProps = Plan & {
  playlist_id: string;
  is_special?: boolean;
};

const PlanCard: React.FC<PlanCardProps> = async ({ ...props }) => {
  const locale = await getLocale();
  const t = await getTranslations("Index");

  return (
    <div
      className={cn(
        "p-7 w-[320px] h-[480px] bg-[#121212] rounded-[20px] flex flex-col gap-4 shadow-[0px_12.71px_42.37px_#1ED76014]",
        { "border-2 border-[#0E672E]": props.is_special }
      )}
    >
      <div
        className={cn(
          "text-xs text-[#003480] border border-[#003480] py-2 px-3 rounded flex justify-center items-center w-fit",
          {
            // "border-greeny text-greeny": props.is_active,
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
      <p className="">
        {props.translations.find((t) => t.locale === locale)?.description}
      </p>
      <div className="mt-auto justify-self-end space-y-2">
        <PayPlanButton
          playlist_id={props.playlist_id}
          plan_id={props.id.toString()}
          is_special={props.is_special}
        />
        <div className="w-fit">
          <p className="text-xs opacity-80">Terms and conditions apply</p>
          <div className="h-px w-full bg-foreground opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
