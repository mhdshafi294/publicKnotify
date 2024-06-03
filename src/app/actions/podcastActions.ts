"use server";

import getTrending from "@/services/podcast/get-trending";

export const getTrendingAction = async ({
  count = "12",
  search,
  category_id,
  page,
  type,
}: {
  count: string;
  search: string;
  category_id: string;
  page: string;
  type: string;
}) => {
  const newPasswordResponse = await getTrending({
    count,
    search,
    category_id,
    page,
    type,
  });
  return newPasswordResponse;
};
