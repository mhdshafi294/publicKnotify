"use server";

// Importing the wallet service
import getWallet from "@/services/wallet/get-wallet";

/**
 * Fetches wallet information based on the provided type.
 *
 * @function getWalletAction
 * @async
 * @param {Object} params - Parameters for fetching the wallet
 * @param {string} params.type - Type of the wallet to fetch (e.g., "savings", "credit")
 * @returns {Promise<Object>} - The wallet information
 *
 * @example
 * const walletInfo = await getWalletAction({ type: "savings" });
 * console.log(walletInfo);
 */
export const getWalletAction = async ({ type }: { type: string }) => {
  return await getWallet({ type });
};
