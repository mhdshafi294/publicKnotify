"use client";

import { togglePriceStatusAction } from "@/app/actions/profileActions";
import { Switch } from "@/components/ui/switch";
import { Link, useRouter } from "@/navigation";
import { PodcasterDetails } from "@/types/podcaster";
import { User } from "@/types/profile";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import React, { useState } from "react";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { cn, getDirection } from "@/lib/utils";

const ProfilePriceSwitcher = ({
  profileData,
  session,
  is_enabled_price,
  profileType,
  isSelfProfile,
}: {
  profileData: User | PodcasterDetails;
  session: Session | null;
  is_enabled_price: boolean;
  profileType: string;
  isSelfProfile: boolean;
}) => {
  const t = useTranslations("Index");
  const [is_enabled, set_enabled] = useState<boolean>(
    is_enabled_price ? is_enabled_price : false
  );
  const router = useRouter();

  const {
    data,
    mutate: server_sendCodeAction,
    isPending,
  } = useMutation({
    mutationFn: togglePriceStatusAction,
  });

  const toggle = async () => {
    if (profileData.price === null) {
      router.push("/podcaster/pricings");
    }
    try {
      await togglePriceStatusAction({ type: "podcaster" });
      set_enabled((prev) => {
        if (!prev) {
          toast.dismiss();
          toast.success(t("pricesVisible"));
        } else {
          toast.dismiss();
          toast.success(t("pricesHidden"));
        }
        return !prev;
      });
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(t("togglePriceError"));
    }
  };

  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <div className="flex justify-center items-center gap-5 mt-6">
      <Link href="/podcaster/pricings" className="text-lg font-medium">
        {t("price")}
      </Link>
      {profileType === "podcaster" && isSelfProfile ? (
        <Switch
          checked={is_enabled}
          disabled={isPending}
          onCheckedChange={toggle}
          className={cn(
            "h-4 w-9 data-[state=checked]:bg-input lg:data-[state=checked]:bg-background data-[state=unchecked]:bg-input *:size-5 *:data-[state=checked]:bg-greeny *:data-[state=unchecked]:bg-card lg:*:data-[state=unchecked]:bg-background *:duration-200 *:data-[state=checked]:translate-x-4 *:data-[state=unchecked]:-translate-x-1 disabled:opacity-20",
            {
              "*:data-[state=checked]:-translate-x-4 *:data-[state=unchecked]:translate-x-1":
                dir === "rtl",
            }
          )}
        />
      ) : null}
    </div>
  );
};

export default ProfilePriceSwitcher;
