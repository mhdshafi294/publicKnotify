import { ApiResponse, Pagination } from ".";
import { Company } from "./company";
import { Podcaster } from "./podcaster";

export type Contract = {
  id: number;
  status: number;
  status_translation: string;
  media_type: string;
  episode_type: number;
  episode_type_translation: string;
  ad_place: string;
  ad_period: string;
  ad_cost: string;
  publishing_date: string;
  publishing_time: string;
  description: string;
  company?: Company;
  podcaster?: Podcaster;
  created_at: string;
  request_name: string;
};

export type ContractResponse = ApiResponse & {
  contracts: Contract;
};

export type ContractsResponse = ApiResponse & {
  contracts: Contract[];
  pagination: Pagination;
};
