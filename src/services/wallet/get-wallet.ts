import { SHOW, STATISTICS, WALLET } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { WalletResponse } from "@/types/wallet";

const getWallet = async ({ type }: { type: string }) => {
  const { data } = await axiosInstance.get<WalletResponse>(
    `/${type}${WALLET}${SHOW}`
  );
  return data.wallet;
};

export default getWallet;
