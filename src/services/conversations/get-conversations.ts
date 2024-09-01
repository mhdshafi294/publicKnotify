import { CONVERSATIONS, REQUEST, SHOW } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { RequestResponse } from "@/types/request";

const getConversations = async ({
  page,
  count,
  search,
  type,
}: {
  page: string;
  count: string;
  search?: string;
  type: string;
}) => {
  const params: any = {
    page,
    count,
    search,
  };
  const { data } = await axiosInstance.get<RequestResponse>(
    `/${type}${CONVERSATIONS}`,
    {
      params,
    }
  );
  return data;
};

export default getConversations;
