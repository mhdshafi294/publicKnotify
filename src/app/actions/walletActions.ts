"use server";

import getWallet from "@/services/wallet/get-wallet";

export const getWalletAction = async ({ type }: { type: string }) => {
  return await getWallet({ type });
};
