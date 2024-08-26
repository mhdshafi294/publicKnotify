import axiosInstance from "@/lib/axios.config";
import { PLAYLIST, STATISTICS } from "@/lib/apiEndPoints";
import { ShowStatisticsResponse } from "@/types/statistics";

const getShowStatistics = async ({
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
  const { data } = await axiosInstance.get<ShowStatisticsResponse>(
    `/${type}${STATISTICS}${PLAYLIST}/${show_id}`,
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

export default getShowStatistics;
