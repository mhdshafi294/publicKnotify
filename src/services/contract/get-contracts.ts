import { CONTRACTS, SHOW, STATISTICS, WALLET } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ContractResponse } from "@/types/contract";

const getContracts = async ({ type }: { type: string }) => {
  const { data } = await axiosInstance.get<ContractResponse>(
    `/${type}${CONTRACTS}`
  );
  return data.contracts;
};

export default getContracts;
