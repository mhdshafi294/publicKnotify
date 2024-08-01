"use server";

import addPodcastToFavorite from "@/services/podcast/add-to-favorite";
import createMedia from "@/services/podcast/create-media";
import createMetadata from "@/services/podcast/create-metadata";
import deleteSelfPodcast from "@/services/podcast/delete-self-podcast";
import getCategories from "@/services/podcast/get-categories";
import getMyPodcastFavoriteCategoriesList from "@/services/podcast/get-my-favorite-categories-list";
import getMyFavoritePodcasts from "@/services/podcast/get-my-favorite-podcasts";
import getPodcastDetails from "@/services/podcast/get-podcast-details";
import getPodcastsByCompany from "@/services/podcast/get-podcasts-by-company";
import getPodcastsByPodcaster from "@/services/podcast/get-podcasts-by-podcaster";
import getSearch from "@/services/podcast/get-search";
import getSelfPlayback from "@/services/podcast/get-self-playback";
import getSelfPodcast from "@/services/podcast/get-self-podcast";
import getSelfPodcasts from "@/services/podcast/get-self-podcasts";
import getTrending from "@/services/podcast/get-trending";
import authYoutube from "@/services/podcast/platform/youtube/auth-youtube";
import publishYoutube from "@/services/podcast/platform/youtube/publish-youtube";
import createPlaylists from "@/services/podcast/playList/create-playlists";
import deletePlaylist from "@/services/podcast/playList/delete-playlist";
import getPlaylist from "@/services/podcast/playList/get-playlist";
import getPlaylists from "@/services/podcast/playList/get-playlists";
import getPlaylistsByPodcaster from "@/services/podcast/playList/get-playlists-by-podcaster";
import updatePlaylists from "@/services/podcast/playList/update-playlists";
import publishPodcast from "@/services/podcast/publish-podcast";
import removeFromFavorite from "@/services/podcast/remove-from-favorite";
import updateMetadata from "@/services/podcast/update-metadata";

export const getTrendingAction = async ({
  count = "24",
  search,
  category_id,
  page = "1",
  type,
}: {
  count?: string;
  search?: string;
  category_id?: string;
  page?: string;
  type: string;
}) => {
  return await getTrending({
    count,
    search,
    category_id,
    page,
    type,
  });
};

export const getCategoriesAction = async () => {
  return await getCategories();
};

export const getMyFavoriteCategoriesListAction = async ({
  type,
}: {
  type: string;
}) => {
  return await getMyPodcastFavoriteCategoriesList({
    type,
  });
};

export const getPodcastDataAction = async ({
  id,
  type,
}: {
  type: string;
  id: number;
}) => {
  return await getPodcastDetails(type, id);
};

export const addToFavoriteAction = async ({
  categories,
  id,
  type,
}: {
  categories: string[];
  id: string;
  type: string;
}) => {
  return await addPodcastToFavorite({ categories, podcastId: id, type });
};

export const removeFromFavoriteAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await removeFromFavorite({ podcastId: id, type });
};

export const createMetadataAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  return await createMetadata({ formData, type });
};

export const updateMetadataAction = async ({
  formData,
  id,
  type,
}: {
  formData: FormData;
  id: string;
  type: string;
}) => {
  return await updateMetadata({ formData, id, type });
};

export const createMediaAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  return await createMedia({ formData, type });
};

export const getSelfPodcastsAction = async ({
  page = "1",
  count = "24",
  search,
  is_published,
  type,
}: {
  page?: string;
  count?: string;
  search?: string;
  is_published?: number;
  type: string;
}) => {
  return await getSelfPodcasts({
    page,
    count,
    search,
    is_published,
    type,
  });
};

export const getSelfPodcastAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await getSelfPodcast({ id, type });
};

export const publishPodcastAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await publishPodcast({ id, type });
};
export const publishYoutubeAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await publishYoutube({ type, id });
};

export const deleteSelfPodcastAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await deleteSelfPodcast({ id, type });
};

export const getMyFavoritePodcastsAction = async ({
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
  return await getMyFavoritePodcasts({
    page,
    count,
    category_id,
    type,
  });
};

export const getPlayListsAction = async ({
  page = "1",
  count = "24",
  search,
  type,
}: {
  page?: string;
  count?: string;
  search?: string;
  type: string;
}) => {
  return await getPlaylists({
    count,
    search,
    page,
    type,
  });
};

export const getPlayListAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await getPlaylist({ id, type });
};

export const createPlayListsAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  return await createPlaylists({ formData, type });
};

export const updatePlayListsAction = async ({
  formData,
  type,
  id,
}: {
  formData: FormData;
  type: string;
  id: string;
}) => {
  return await updatePlaylists({ formData, type, id });
};

export const deletePlayListsAction = async ({
  type,
  id,
}: {
  type: string;
  id: string;
}) => {
  return await deletePlaylist({ type, id });
};

export const getPodcastsByPodcasterAction = async ({
  page = "1",
  count = "24",
  podcasterId,
  type,
}: {
  page?: string;
  count?: string;
  podcasterId: string;
  type: string;
}) => {
  return await getPodcastsByPodcaster({
    page,
    count,
    podcasterId,
    type,
  });
};

export const getPodcastsByCompanyAction = async ({
  page = "1",
  count = "24",
  companyId,
  type,
}: {
  page?: string;
  count?: string;
  companyId: string;
  type: string;
}) => {
  return await getPodcastsByCompany({
    page,
    count,
    companyId,
    type,
  });
};

export const getPlayListsByPodcasterAction = async ({
  podcasterId,
  page = "1",
  count = "24",
  search,
  type,
}: {
  podcasterId: string;
  page?: string;
  count?: string;
  search?: string;
  type: string;
}) => {
  return await getPlaylistsByPodcaster({
    podcasterId,
    count,
    search,
    page,
    type,
  });
};

export const getSelfPlaybackAction = async ({
  page = "1",
  count = "24",
  type,
}: {
  page?: string;
  count?: string;
  type: string;
}) => {
  return await getSelfPlayback({
    count,
    page,
    type,
  });
};
export const authYoutubeAction = async () => {
  return await authYoutube();
};

export const getSearchAction = async ({
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
  return await getSearch({
    count,
    search,
    page,
    type,
  });
};
