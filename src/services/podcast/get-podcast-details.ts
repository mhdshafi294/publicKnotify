import { DETAILS, PODCAST } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";
import { PodcastDetails } from "@/types/podcast";

const getPodcastDetails = async ({
  type,
  id,
}: {
  type: string;
  id: string;
}) => {
  const { data } = await axiosInstance.get<
    ApiResponse & {
      podcast: PodcastDetails;
    }
  >(`/${type}${PODCAST}${DETAILS}/${id}`);
  return data.podcast;
};

export default getPodcastDetails;
