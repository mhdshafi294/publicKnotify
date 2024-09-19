import { ApiResponse } from ".";
import { Company } from "./company";
import { Contract } from "./contract";

export type Wallet = {
  id: number;
  total: number;
  current: number;
  last_payment_at: string;
  transactions: Transaction[];
};

export type Transaction = {
  id: number;
  amount: string;
  status: string;
  contract: Contract;
  description: string;
  created_at: string;
};

export type WalletResponse = ApiResponse & {
  wallet: Wallet;
};
