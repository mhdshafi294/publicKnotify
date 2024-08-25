import axiosInstance from "@/lib/axios.config";
import { PLAYLIST, STATISTICS, VIEWS_OVER_TIME } from "@/lib/apiEndPoints";
import {
  ShowViewsStatisticsResponse,
  StatisticsResponse,
} from "@/types/statistics";

const getShowViewsStatistics = async ({
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
  const { data } = await axiosInstance.get<ShowViewsStatisticsResponse>(
    `/${type}${STATISTICS}${PLAYLIST}${VIEWS_OVER_TIME}/${show_id}`,
    {
      params: {
        start_date,
        end_date,
        day,
        podcat_id,
      },
    }
  );
  return data.statistics;
};

export default getShowViewsStatistics;
