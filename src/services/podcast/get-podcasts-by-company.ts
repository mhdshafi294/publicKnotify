import { COMPANY, PODCAST, PODCASTER, PODCASTS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { PodcastsResponse } from "@/types/podcast";

const getPodcastsByCompany = async ({
  page = "1",
  count = "24",
  companyId,
  type,
}: {
  page?: string;
  count?: string;
  companyId: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<PodcastsResponse>(
    `/${type}${COMPANY}/collection/${companyId}`,
    {
      params: {
        page,
        count,
      },
    }
  );
  return data;
};

export default getPodcastsByCompany;
