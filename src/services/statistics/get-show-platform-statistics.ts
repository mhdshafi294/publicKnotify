import { PLATFORM, STATISTICS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ShowPlatformStatisticsResponse } from "@/types/statistics";

const getShowPlatformStatistics = async ({
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
  const { data } = await axiosInstance.get<ShowPlatformStatisticsResponse>(
    `/${type}${STATISTICS}${PLATFORM}/${show_id}`,
    {
      params: {
        start_date,
        end_date,
      },
    }
  );
  return data.statistics;
};

export default getShowPlatformStatistics;
