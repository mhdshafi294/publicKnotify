import { PLAYLIST_DISTRIBUTION } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { DistreputionsResponse } from "@/types/podcast";

const getDistributionLinks = async ({
  count,
  search,
  page,
  playlist_id,
  type,
}: {
  search?: string;
  playlist_id?: string;
  count: string;
  page: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<DistreputionsResponse>(
    `/${type}${PLAYLIST_DISTRIBUTION}`,
    {
      params: {
        playlist_id,
        count,
        search,
        page,
      },
    }
  );
  return data;
};

export default getDistributionLinks;
