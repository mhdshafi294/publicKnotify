"use server";

import getProfile from "@/services/profile/get-profile";
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
