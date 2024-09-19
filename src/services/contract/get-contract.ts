import { CONTRACTS, SHOW, STATISTICS, WALLET } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ContractResponse } from "@/types/contract";

const getContract = async ({ type, id }: { type: string; id: string }) => {
  const { data } = await axiosInstance.get<ContractResponse>(
    `/${type}${CONTRACTS}/${id}`
  );
  return data.contracts;
};

export default getContract;
