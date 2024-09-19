"use server";

import getShowMostPopularStatistics from "@/services/statistics/get-show-most-popular-statistics";
import getShowStatistics from "@/services/statistics/get-show-statistics";
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
  return await getShowStatistics({
    start_date,
    end_date,
    day,
    podcat_id,
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
