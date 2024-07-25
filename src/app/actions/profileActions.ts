"use server";

import { EditPricingSchema } from "@/schema/pricingsSchema";
import authenticateYoutube from "@/services/profile/authenticate-youtube";
import getProfile from "@/services/profile/get-profile";
import createOrUpdatePrice from "@/services/profile/price/create-or-update-price";
import getPricings from "@/services/profile/price/get-pricings";
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
export const createOrCreatePriceAction = async ({
  body,
}: {
  body: EditPricingSchema;
}) => {
  return await createOrUpdatePrice({ body });
  
};

export const getPricingsAction = async ({ type }: { type: string }) => {
  return await getPricings({ type });
};

export const authenticateYoutubeAction = async () => {
  return await authenticateYoutube();
};
