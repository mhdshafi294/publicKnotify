"use server";

// Import statements organized by categories

// Podcast services
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
import publishPodcast from "@/services/podcast/publish-podcast";
import removeFromFavorite from "@/services/podcast/remove-from-favorite";
import savePlayback from "@/services/podcast/save-playback";
import updateMetadata from "@/services/podcast/update-metadata";

// YouTube platform services
import authYoutube from "@/services/podcast/platform/youtube/auth-youtube";
import publishYoutube from "@/services/podcast/platform/youtube/publish-youtube";

// Playlist services
import createPlaylists from "@/services/podcast/playList/create-playlists";
import deletePlaylist from "@/services/podcast/playList/delete-playlist";
import getPlaylist from "@/services/podcast/playList/get-playlist";
import getPlaylists from "@/services/podcast/playList/get-playlists";
import getPlaylistsByPodcaster from "@/services/podcast/playList/get-playlists-by-podcaster";
import updatePlaylists from "@/services/podcast/playList/update-playlists";

// Actions related to podcasts
/**
 * Fetches trending podcasts.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.count - The number of podcasts to fetch.
 * @param {string} params.search - The search query for filtering podcasts.
 * @param {string} params.category_id - The category ID for filtering.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response containing trending podcasts.
 */
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

/**
 * Fetches podcast categories.
 *
 * @returns {Promise} - The API response containing podcast categories.
 */
export const getCategoriesAction = async () => {
  return await getCategories();
};

/**
 * Fetches the list of favorite podcast categories.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response containing favorite categories list.
 */
export const getMyFavoriteCategoriesListAction = async ({
  type,
}: {
  type: string;
}) => {
  return await getMyPodcastFavoriteCategoriesList({ type });
};

/**
 * Fetches podcast details.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.id - The ID of the podcast.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response containing podcast details.
 */
export const getPodcastDetailsAction = async ({
  id,
  type,
}: {
  type: string;
  id: string;
}) => {
  return await getPodcastDetails({ type, id });
};

/**
 * Adds a podcast to the favorites list.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string[]} params.categories - The categories to add to the favorite list.
 * @param {string} params.id - The ID of the podcast.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response.
 */
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

/**
 * Removes a podcast from the favorites list.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.id - The ID of the podcast.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response.
 */
export const removeFromFavoriteAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await removeFromFavorite({ podcastId: id, type });
};

/**
 * Creates podcast metadata.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {FormData} params.formData - The form data containing metadata.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response.
 */
export const createMetadataAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  return await createMetadata({ formData, type });
};

/**
 * Updates podcast metadata.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {FormData} params.formData - The form data containing updated metadata.
 * @param {string} params.id - The ID of the podcast.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response.
 */
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

/**
 * Saves playback position of a podcast.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.id - The ID of the podcast.
 * @param {string} params.type - The type of podcast.
 * @param {number} params.current_position - The current playback position.
 * @param {number} params.total_time - The total playback time.
 * @returns {Promise} - The API response.
 */
export const savePlaybackAction = async ({
  id,
  type,
  current_position,
  total_time,
}: {
  id: string;
  type: string;
  current_position: number;
  total_time: number;
}) => {
  return await savePlayback({ id, type, current_position, total_time });
};

/**
 * Creates media for a podcast.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {FormData} params.formData - The form data containing media.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response.
 */
export const createMediaAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  return await createMedia({ formData, type });
};

/**
 * Fetches self podcasts with optional search and pagination.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.count - The number of podcasts to fetch.
 * @param {string} params.search - The search query for filtering podcasts.
 * @param {number} params.is_published - The publication status.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response containing self podcasts.
 */
export const getSelfPodcastsAction = async ({
  page = "1",
  count = "24",
  search,
  is_published,
  playlist_id,
  type,
}: {
  page?: string;
  count?: string;
  search?: string;
  is_published?: number;
  playlist_id?: string;
  type: string;
}) => {
  return await getSelfPodcasts({
    page,
    count,
    search,
    is_published,
    type,
    playlist_id,
  });
};

/**
 * Fetches details of a specific self podcast.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.id - The ID of the podcast.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response containing self podcast details.
 */
export const getSelfPodcastAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await getSelfPodcast({ id, type });
};

/**
 * Publishes a podcast.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.id - The ID of the podcast.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response.
 */
export const publishPodcastAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await publishPodcast({ id, type });
};

/**
 * Publishes a podcast on YouTube.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.id - The ID of the podcast.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response.
 */
export const publishYoutubeAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await publishYoutube({ type, id });
};

/**
 * Deletes a self podcast.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.id - The ID of the podcast.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response.
 */
export const deleteSelfPodcastAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await deleteSelfPodcast({ id, type });
};

/**
 * Fetches favorite podcasts with optional search and pagination.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.count - The number of podcasts to fetch.
 * @param {string} params.category_id - The category ID for filtering.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response containing favorite podcasts.
 */
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
  return await getMyFavoritePodcasts({ page, count, category_id, type });
};

// Actions related to playlists

/**
 * Fetches playlists with optional search and pagination.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.count - The number of playlists to fetch.
 * @param {string} params.search - The search query for filtering playlists.
 * @param {string} params.type - The type of playlist.
 * @returns {Promise} - The API response containing playlists.
 */
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
  return await getPlaylists({ count, search, page, type });
};

/**
 * Fetches details of a specific playlist.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.id - The ID of the playlist.
 * @param {string} params.type - The type of playlist.
 * @returns {Promise} - The API response containing playlist details.
 */
export const getPlayListAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await getPlaylist({ id, type });
};

/**
 * Creates a new playlist.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {FormData} params.formData - The form data containing playlist details.
 * @param {string} params.type - The type of playlist.
 * @returns {Promise} - The API response.
 */
export const createPlayListsAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  return await createPlaylists({ formData, type });
};

/**
 * Updates an existing playlist.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {FormData} params.formData - The form data containing updated playlist details.
 * @param {string} params.id - The ID of the playlist.
 * @param {string} params.type - The type of playlist.
 * @returns {Promise} - The API response.
 */
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

/**
 * Deletes a playlist.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.id - The ID of the playlist.
 * @param {string} params.type - The type of playlist.
 * @returns {Promise} - The API response.
 */
export const deletePlayListsAction = async ({
  type,
  id,
}: {
  type: string;
  id: string;
}) => {
  return await deletePlaylist({ type, id });
};

// Actions related to podcasters and companies

/**
 * Fetches podcasts by a specific podcaster.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.count - The number of podcasts to fetch.
 * @param {string} params.podcasterId - The ID of the podcaster.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response containing podcasts.
 */
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
  return await getPodcastsByPodcaster({ page, count, podcasterId, type });
};

/**
 * Fetches podcasts by a specific company.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.count - The number of podcasts to fetch.
 * @param {string} params.companyId - The ID of the company.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response containing podcasts.
 */
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
  return await getPodcastsByCompany({ page, count, companyId, type });
};

/**
 * Fetches playlists by a specific podcaster.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.podcasterId - The ID of the podcaster.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.count - The number of playlists to fetch.
 * @param {string} params.search - The search query for filtering playlists.
 * @param {string} params.type - The type of playlist.
 * @returns {Promise} - The API response containing playlists.
 */
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

/**
 * Fetches playback details for self podcasts.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.count - The number of podcasts to fetch.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response containing playback details.
 */
export const getSelfPlaybackAction = async ({
  page = "1",
  count = "24",
  type,
}: {
  page?: string;
  count?: string;
  type: string;
}) => {
  return await getSelfPlayback({ count, page, type });
};

// YouTube actions

/**
 * Authenticates YouTube account.
 *
 * @returns {Promise} - The API response.
 */
export const authYoutubeAction = async () => {
  return await authYoutube();
};

// Search actions

/**
 * Fetches search results for podcasts.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.count - The number of podcasts to fetch.
 * @param {string} params.search - The search query for filtering podcasts.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.type - The type of podcast.
 * @returns {Promise} - The API response containing search results.
 */
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
  return await getSearch({ count, search, page, type });
};
