"use client";

import { togglePriceStatusAction } from "@/app/actions/profileActions";
import { Switch } from "@/components/ui/switch";
import { Link } from "@/navigation";
import { PodcasterDetails } from "@/types/podcaster";
import { User } from "@/types/profile";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import React, { useState } from "react";
import { toast } from "sonner";

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
  const [is_enabled, set_enabled] = useState<boolean>(
    is_enabled_price ? is_enabled_price : false
  );

  const {
    data,
    mutate: server_sendCodeAction,
    isPending,
  } = useMutation({
    mutationFn: togglePriceStatusAction,
  });

  const toggle = async () => {
    try {
      await togglePriceStatusAction({ type: "podcaster" });
      set_enabled((prev) => {
        if (!prev) {
          toast.dismiss();
          toast.success("Companies can show your prices now.");
        } else {
          toast.dismiss();
          toast.success("Companies can't show your prices now.");
        }
        return !prev;
      });
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Something went wrong.please try again!");
    }
  };

  return (
    <div className="flex justify-center items-center gap-5 mt-6">
      <Link href="/podcaster/pricings" className="text-lg font-medium">
        Price
      </Link>
      {profileType === "podcaster" && isSelfProfile ? (
        <Switch
          checked={is_enabled}
          disabled={isPending}
          onCheckedChange={toggle}
          className="h-4 w-9 data-[state=checked]:bg-input lg:data-[state=checked]:bg-background data-[state=unchecked]:bg-input *:size-5 *:data-[state=checked]:bg-greeny *:data-[state=unchecked]:bg-card lg:*:data-[state=unchecked]:bg-background *:duration-200 *:data-[state=checked]:translate-x-4 *:data-[state=unchecked]:-translate-x-1 disabled:opacity-20"
        />
      ) : null}
    </div>
  );
};

export default ProfilePriceSwitcher;
