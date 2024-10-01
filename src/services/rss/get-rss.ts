import { RSS, SHOW } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { RssResponse } from "@/types/podcast";

const getRss = async ({ type, showId }: { type: string; showId: string }) => {
  const { data } = await axiosInstance.get<RssResponse>(
    `/${type}${RSS}${SHOW}/${showId}`
  );
  return data;
};
export default getRss;
