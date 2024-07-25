import axiosInstance from "@/lib/axios.config";
import { DETAILS, PODCASTER } from "@/lib/apiEndPoints";
import { PodcasterResponse } from "@/types/podcaster";

const getCompany = async ({ id, type }: { id: string; type: string }) => {
  const { data } = await axiosInstance.get<PodcasterResponse>( // TODO: change type to CompanyResponse
    `/${type}${PODCASTER}${DETAILS}/${id}`
  );
  return data;
};

export default getCompany;
