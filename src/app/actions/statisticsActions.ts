"use server";

// Importing the statistics service
import getStatistics from "@/services/statistics/get-statistics";

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
