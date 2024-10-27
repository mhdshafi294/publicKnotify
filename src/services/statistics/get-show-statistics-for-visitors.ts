import { PODCASTER_PLAYLIST, STATISTICS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ShowStatisticsForVisitorsResponse } from "@/types/statistics";

const getShowStatisticsForVisitors = async ({
  podcaster_id,
  show_id,
  type,
}: {
  podcaster_id: string;
  show_id: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<ShowStatisticsForVisitorsResponse>(
    `/${type}${STATISTICS}${PODCASTER_PLAYLIST}`,
    {
      params: {
        podcaster_id: podcaster_id,
        playlist_id: show_id,
      },
    }
  );
  return data.statistics;
};

export default getShowStatisticsForVisitors;
