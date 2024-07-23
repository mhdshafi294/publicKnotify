"use server";

import authenticateYoutube from "@/services/profile/authenticate-youtube";
import getProfile from "@/services/profile/get-profile";
import togglePriceStatus from "@/services/profile/price/toggle-price-status";
import updateProfile from "@/services/profile/update-profile";

export const getProfileAction = async ({ type }: { type: string }) => {
  return await getProfile({ type });
};

export const updateProfileAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  return await updateProfile({ formData, type });
};

export const togglePriceStatusAction = async ({ type }: { type: string }) => {
  return await togglePriceStatus({ type });
};

export const authenticateYoutubeAction = async () => {
  return await authenticateYoutube();
};
