import axiosInstance from "@/lib/axios.config";
import { COMPANY, DETAILS } from "@/lib/apiEndPoints";
import { CompanyResponse } from "@/types/company";

const getCompany = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.get<CompanyResponse>(
    `/${type}${COMPANY}${DETAILS}/${id}`
  );
  return data;
};

export default getCompany;
