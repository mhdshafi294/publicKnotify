"use server";

import getMyFavoritePodcasters from "@/services/podcaster/get-my-favorite-podcasters";
import addPodcastToFavorite from "@/services/podcaster/add-to-favorite";
import getPodcaster from "@/services/podcaster/get-podcaster";
import getPodcasters from "@/services/podcaster/get-podcasters";
import removeFromFavorite from "@/services/podcaster/remove-from-favorite";
import getCompanySelfPodcasters from "@/services/podcaster/get-company-self-podcasters";
import getPodcastersByCompany from "@/services/podcaster/get-podcasters-by-company";

export const getPodcastersAction = async ({
  count = "12",
  search,
  page,
  type,
}: {
  count: string;
  search?: string;
  page: string;
  type: string;
}) => {
  const getPodcastersResponse = await getPodcasters({
    count,
    search,
    page,
    type,
  });
  return getPodcastersResponse;
};

export const getPodcasterAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const getPodcasterResponse = await getPodcaster({
    id,
    type,
  });
  return getPodcasterResponse;
};

// export const getMyFavoriteCategoriesListAction = async ({
//   type,
// }: {
//   type: string;
// }) => {
//   const getMyFavoriteCategoriesListResponse =
//     await getMyPodcasterFavoriteCategoriesList({
//       type,
//     });
//   return getMyFavoriteCategoriesListResponse;
// };

export const addToFavoriteAction = async ({
  categories,
  id,
  type,
}: {
  categories: string[];
  id: string;
  type: string;
}) => {
  return await addPodcastToFavorite({ categories, podcasterId: id, type });
};

export const removeFromFavoriteAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await removeFromFavorite({ podcasterId: id, type });
};

export const getMyFavoritePodcastersAction = async ({
  page = "1",
  count = "12",
  category_id,
  type,
}: {
  page?: string;
  count?: string;
  category_id?: string;
  type: string;
}) => {
  return await getMyFavoritePodcasters({
    page,
    count,
    category_id,
    type,
  });
};

export const getCompanySelfPodcastersAction = async ({
  count = "24",
  search,
  page = "1",
  type,
}: {
  count?: string;
  search?: string;
  page?: string;
  type: string;
}) => {
  return await getCompanySelfPodcasters({
    count,
    search,
    page,
    type,
  });
};
export const getPodcastersByCompanyAction = async ({
  companyId,
  count = "24",
  search,
  page = "1",
  type,
}: {
  companyId: string;
  count?: string;
  search?: string;
  page?: string;
  type: string;
}) => {
  return await getPodcastersByCompany({
    companyId,
    count,
    search,
    page,
    type,
  });
};
