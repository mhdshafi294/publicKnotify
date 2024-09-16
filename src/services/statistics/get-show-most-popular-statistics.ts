import axiosInstance from "@/lib/axios.config";
import { MOST_POPULAR, PLAYLIST, STATISTICS } from "@/lib/apiEndPoints";
import { ShowMostPopularStatisticsResponse } from "@/types/statistics";

const getShowMostPopularStatistics = async ({
  show_id,
  type,
}: {
  show_id: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<ShowMostPopularStatisticsResponse>(
    `/${type}${STATISTICS}${MOST_POPULAR}/${show_id}`
  );
  return data.statistics;
};

export default getShowMostPopularStatistics;
