import axiosInstance from "@/lib/axios.config";
import { COMPANY, PODCASTERS } from "@/lib/apiEndPoints";
import { PodcastersResponse } from "@/types/podcaster";

const getPodcastersByCompany = async ({
  companyId,
  count,
  search,
  page,
  type,
}: {
  companyId: string;
  count: string;
  search?: string;
  page: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<PodcastersResponse>(
    `/${type}${COMPANY}${PODCASTERS}/${companyId}`,
    {
      params: {
        count,
        search,
        page,
      },
    }
  );
  return data;
};

export default getPodcastersByCompany;
