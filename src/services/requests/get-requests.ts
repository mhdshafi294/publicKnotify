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
  status?: string[];
  type: string;
}) => {
  const params: any = {
    page,
    count,
    search,
  };
  status?.forEach((statu, index) => {
    params[index] = statu;
  });
  const { data } = await axiosInstance.get<RequestsResponse>(
    `/${type}${REQUEST}${INDEX}`,
    {
      params,
    }
  );
  return data;
};

export default getRequests;
