import { PLAYLIST, STATISTICS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ShowStatisticsResponse } from "@/types/statistics";

const getShowStatistics = async ({
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
  const { data } = await axiosInstance.get<ShowStatisticsResponse>(
    `/${type}${STATISTICS}${PLAYLIST}/${show_id}`,
    {
      params: {
        start_date,
        end_date,
        day,
        podcast_id,
      },
    }
  );
  return data.statistics;
};

export default getShowStatistics;
