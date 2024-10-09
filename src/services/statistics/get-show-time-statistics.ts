import axiosInstance from "@/lib/axios.config";
import { STATISTICS, TIME } from "@/lib/apiEndPoints";
import { ShowTimeStatisticsResponse } from "@/types/statistics";

const getShowTimeStatistics = async ({
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
  const { data } = await axiosInstance.get<ShowTimeStatisticsResponse>(
    `/${type}${STATISTICS}${TIME}/${show_id}`,
    {
      params: {
        start_date,
        end_date,
      },
    }
  );
  return data.statistics;
};

export default getShowTimeStatistics;
