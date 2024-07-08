import { INDEX, REQUEST, TRENDING } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { RequestsResponse } from "@/types/request";

const getRequests = async ({
  page,
  count,
  search,
  status,
  type,
}: {
  page: string;
  count: string;
  search?: string;
  status?: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<RequestsResponse>(
    `/${type}${REQUEST}${INDEX}`,
    {
      params: {
        page,
        count,
        search,
        status,
      },
    }
  );
  return data;
};

export default getRequests;
