import { ApiResponse } from ".";
import { Company } from "./company";

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

export type Contract = {
  id: number;
  status: number;
  status_translation: string;
  media_type: string;
  episode_type: number;
  episode_type_translation: string;
  ad_palce: string;
  ad_period: string;
  ad_cost: string;
  publishing_date: string;
  publishing_time: string;
  description: string;
  company: Company;
};

export type WalletResponse = ApiResponse & {
  wallet: Wallet;
};
