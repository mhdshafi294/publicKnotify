import { COUNTRY, STATISTICS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ShowCountryStatisticsResponse } from "@/types/statistics";

const getShowCountryStatistics = async ({
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
  const { data } = await axiosInstance.get<ShowCountryStatisticsResponse>(
    `/${type}${STATISTICS}${COUNTRY}/${show_id}`,
    {
      params: {
        start_date,
        end_date,
      },
    }
  );
  return data.statistics;
};

export default getShowCountryStatistics;
