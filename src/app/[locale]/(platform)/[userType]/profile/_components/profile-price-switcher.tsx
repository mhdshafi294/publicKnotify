"use client";

import { useRouter } from "@/navigation";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

import { togglePriceStatusAction } from "@/app/actions/profileActions";
import { Switch } from "@/components/ui/switch";
import { cn, getDirection } from "@/lib/utils";
import { PodcasterDetails } from "@/types/podcaster";
import { User } from "@/types/profile";

/**
 * Component for toggling the visibility of a podcaster's pricing on their profile.
 *
 * @param {object} props - Component props.
 * @param {User | PodcasterDetails} props.profileData - The profile data of the user or podcaster.
 * @param {Session | null} props.session - The current user session.
 * @param {boolean} props.is_enabled_price - Indicates whether the price visibility is enabled.
 * @param {string} props.profileType - The type of the profile (e.g., "podcaster").
 * @param {boolean} props.isSelfProfile - Whether the profile belongs to the current user.
 * @returns {JSX.Element} The rendered component.
 */
const ProfilePriceSwitcher = ({
  is_enabled_price,
  profileType,
  isSelfProfile,
  ad_type_id,
}: {
  is_enabled_price: boolean;
  profileType: string;
  isSelfProfile: boolean;
  ad_type_id: string;
}) => {
  const t = useTranslations("Index");
  const [is_enabled, set_enabled] = useState<boolean>(
    is_enabled_price || false
  );
  const router = useRouter();

  const { mutate: server_sendCodeAction, isPending } = useMutation({
    mutationFn: togglePriceStatusAction,
    onSuccess: (data) => {
      // console.log(data);
      if (typeof data === "string") {
        console.error(data);
        toast.dismiss();
        toast.error(data);
      } else {
        set_enabled((prev) => {
          toast.dismiss();
          toast.success(prev ? t("pricesHidden") : t("pricesVisible"));
          return !prev;
        });
      }
    },
    onError: (error) => {
      console.error(error);
      toast.dismiss();
      toast.error(t("togglePriceError"));
    },
  });

  const toggle = async () => {
    server_sendCodeAction({
      type: "podcaster",
      ad_type_id: ad_type_id.toString(),
    });
  };

  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <div className="flex justify-center items-center">
      {profileType === "podcaster" && isSelfProfile && (
        <Switch
          checked={is_enabled}
          disabled={isPending}
          onCheckedChange={toggle}
          className={cn(
            "h-4 w-9 data-[state=checked]:bg-input lg:data-[state=checked]:bg-input data-[state=unchecked]:bg-input *:size-5 *:data-[state=checked]:bg-greeny *:data-[state=unchecked]:bg-card lg:*:data-[state=unchecked]:bg-card *:duration-200 *:data-[state=checked]:translate-x-4 *:data-[state=unchecked]:-translate-x-1 disabled:opacity-20",
            {
              "*:data-[state=checked]:-translate-x-4 *:data-[state=unchecked]:translate-x-1":
                dir === "rtl",
            }
          )}
        />
      )}
    </div>
  );
};

export default ProfilePriceSwitcher;
