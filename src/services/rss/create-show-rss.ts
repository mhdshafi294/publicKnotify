import { CREATE_SHOW, RSS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { RssResponse } from "@/types/podcast";

const createShowRss = async ({
  type,
  showId,
}: {
  type: string;
  showId: string;
}) => {
  const { data } = await axiosInstance.get<RssResponse>(
    `/${type}${RSS}${CREATE_SHOW}/${showId}`
  );
  return data;
};
export default createShowRss;
