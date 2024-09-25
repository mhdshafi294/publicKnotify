import { CONTRACTS } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ContractsResponse } from "@/types/contract";

const getContracts = async ({
  page,
  count,
  search,
  company_request_id,
  company_id,
  type,
}: {
  page: string;
  count: string;
  search?: string;
  company_request_id?: string;
  company_id?: string;
  type: string;
}) => {
  const params: any = {
    page,
    count,
    search,
    company_request_id,
    company_id,
  };

  const { data } = await axiosInstance.get<ContractsResponse>(
    `/${type}${CONTRACTS}`,
    {
      params,
    }
  );
  return data;
};

export default getContracts;
