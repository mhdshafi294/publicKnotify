import axiosInstance from "@/lib/axios.config";
import { STATISTICS } from "@/lib/apiEndPoints";
import { StatisticsResponse } from "@/types/statistics";

const getStatistics = async ({
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
  const { data } = await axiosInstance.get<StatisticsResponse>(
    `/${type}${STATISTICS}/${podcat_id}`,
    {
      params: {
        start_date,
        end_date,
        day,
      },
    }
  );
  return data.statistics;
};

export default getStatistics;
