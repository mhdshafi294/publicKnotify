import axiosInstance from "@/lib/axios.config";
import { COMPANY } from "@/lib/apiEndPoints";
import { CompaniesResponse } from "@/types/company";

const getCompanies = async ({
  count,
  search,
  page: page,
  type,
}: {
  count: string;
  search?: string;
  page: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<CompaniesResponse>(
    `/${type}${COMPANY}`,
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

export default getCompanies;
