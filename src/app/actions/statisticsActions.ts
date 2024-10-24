"use server";

import getShowCountryStatistics from "@/services/statistics/get-show-country-statistics";
import getShowMostPopularStatistics from "@/services/statistics/get-show-most-popular-statistics";
import getShowPlatformStatistics from "@/services/statistics/get-show-platform-statistics";
import getShowStatistics from "@/services/statistics/get-show-statistics";
import getShowStatisticsForVisitors from "@/services/statistics/get-show-statistics-for-visitors";
import getShowTimeStatistics from "@/services/statistics/get-show-time-statistics";
import getShowViewsStatistics from "@/services/statistics/get-show-views-statistics";
// Importing the statistics service
import getStatistics from "@/services/statistics/get-statistics";
import postEnableStatistics from "@/services/statistics/post-enable-statiscics";

/**
 * Fetches statistics for a specific podcast based on the provided parameters.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} [params.start_date] - The start date for the statistics range.
 * @param {string} [params.end_date] - The end date for the statistics range.
 * @param {string} [params.day] - The specific day for the statistics.
 * @param {string} params.podcat_id - The ID of the podcast.
 * @param {string} params.type - The type of statistics.
 * @returns {Promise} - The API response containing the statistics data.
 */
export const getStatisticsAction = async ({
  start_date,
  end_date,
  day,
  podcat_id,
  type,
}: {
  start_date?: string;
  end_date?: string;
  day?: string;
  podcat_id: string;
  type: string;
}) => {
  return await getStatistics({
    start_date,
    end_date,
    day,
    podcat_id,
    type,
  });
};

/**
 * Fetches statistics for a specific show based on the provided parameters.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} [params.start_date] - The start date for the statistics range.
 * @param {string} [params.end_date] - The end date for the statistics range.
 * @param {string} [params.day] - The specific day for the statistics.
 * @param {string} params.podcat_id - The ID of the podcast.
 * @param {string} params.show_id - The ID of the show.
 * @param {string} params.type - The type of statistics.
 * @returns {Promise} - The API response containing the statistics data.
 */
export const getShowStatisticsAction = async ({
  start_date,
  end_date,
  day,
  podcast_id,
  show_id,
  type,
}: {
  start_date?: string;
  end_date?: string;
  day?: string;
  podcast_id?: string;
  show_id: string;
  type: string;
}) => {
  return await getShowStatistics({
    start_date,
    end_date,
    day,
    podcast_id,
    show_id,
    type,
  });
};

/**
 * Fetches views statistics for a specific show based on the provided parameters.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} [params.start_date] - The start date for the views statistics range.
 * @param {string} [params.end_date] - The end date for the views statistics range.
 * @param {string} [params.day] - The specific day for the views statistics.
 * @param {string} params.podcat_id - The ID of the podcast.
 * @param {string} params.show_id - The ID of the show.
 * @param {string} params.type - The type of views statistics.
 * @returns {Promise} - The API response containing the views statistics data.
 */
export const getShowViewsStatisticsAction = async ({
  start_date,
  end_date,
  day,
  podcat_id,
  show_id,
  type,
}: {
  start_date?: string;
  end_date?: string;
  day?: string;
  podcat_id?: string;
  show_id: string;
  type: string;
}) => {
  return await getShowViewsStatistics({
    start_date,
    end_date,
    day,
    podcat_id,
    show_id,
    type,
  });
};

/**
 * Fetches most popular statistics for a specific show based on the provided parameters.
 *
 * @param {Object} params - The parameters for the API request.
 * @param {string} params.show_id - The ID of the show.
 * @param {string} params.type - The type of most popular statistics.
 * @returns {Promise} - The API response containing the most popular statistics data.
 */
export const getShowMostPopularStatisticsAction = async ({
  show_id,
  type,
}: {
  show_id: string;
  type: string;
}) => {
  return await getShowMostPopularStatistics({
    show_id,
    type,
  });
};

/**
 * Asynchronously enables statistics for a given type with the specified body.
 * @param {object} param0 - An object containing the type and body of the statistics to enable.
 * @param {string} param0.type - The type of statistics to enable.
 * @param {object} param0.body - The body containing specific statistics values to enable.
 * @param {number} param0.body.playlist_statistics - The number of playlist statistics to enable.
 * @param {number} param0.body.top_episodes - The number of top episodes statistics to enable.
 * @param {number} param0.body.youtube_channel - The number of YouTube channel statistics to enable.
 * @param {number} param0.body.most_popular - The
 */
export const postEnableStatisticsAction = async ({
  type,
  body,
}: {
  type: string;
  body: {
    playlist_statistics: number;
    top_episodes: number;
    youtube_channel: number;
    most_popular: number;
  };
}) => {
  return await postEnableStatistics({
    type,
    body,
  });
};

/**
 * Asynchronously fetches show time statistics for a given show ID and type.
 * @param {Object} showData - An object containing the show ID and type.
 * @param {string} showData.show_id - The ID of the show for which statistics are requested.
 * @param {string} showData.type - The type of statistics to retrieve.
 * @returns {Promise} A promise that resolves to the show time statistics.
 */
export const getShowTimeStatisticsAction = async ({
  start_date,
  end_date,
  show_id,
  type,
}: {
  start_date?: string;
  end_date?: string;
  show_id: string;
  type: string;
}) => {
  return await getShowTimeStatistics({
    start_date,
    end_date,
    show_id,
    type,
  });
};

/**
 * Asynchronously retrieves platform statistics for a specific show based on the show ID and type.
 * @param {Object} show_id - The ID of the show for which statistics are to be retrieved.
 * @param {Object} type - The type of statistics to retrieve.
 * @returns {Promise} A promise that resolves with the platform statistics for the specified show.
 */
export const getShowPlatformStatisticsAction = async ({
  start_date,
  end_date,
  show_id,
  type,
}: {
  start_date?: string;
  end_date?: string;
  show_id: string;
  type: string;
}) => {
  return await getShowPlatformStatistics({
    start_date,
    end_date,
    show_id,
    type,
  });
};

/**
 * Retrieves country statistics for a specific show based on the provided parameters.
 * @param {Object} params - An object containing the parameters for fetching country statistics.
 * @param {string} [params.start_date] - The start date for the statistics.
 * @param {string} [params.end_date] - The end date for the statistics.
 * @param {string} params.show_id - The ID of the show for which statistics are requested.
 * @param {string} params.type - The type of statistics to retrieve.
 * @returns {Promise} A promise that resolves with the country statistics for the show.
 */
export const getShowCountryStatisticsAction = async ({
  start_date,
  end_date,
  show_id,
  type,
}: {
  start_date?: string;
  end_date?: string;
  show_id: string;
  type: string;
}) => {
  return await getShowCountryStatistics({
    start_date,
    end_date,
    show_id,
    type,
  });
};

export const getShowStatisticsForVisitorsAction = async ({
  podcaster_id,
  show_id,
  type,
}: {
  podcaster_id: string;
  show_id: string;
  type: string;
}) => {
  return await getShowStatisticsForVisitors({
    podcaster_id,
    show_id,
    type,
  });
};
