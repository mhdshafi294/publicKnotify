import { boolean } from "zod";
import { ApiResponse, Pagination } from ".";
import { Company } from "./company";
import { Podcaster } from "./podcaster";

export type Contract = {
  id: number;
  status: number;
  status_translation: string;
  media_type: "audio" | "video";
  // episode_type: number;
  // episode_type_translation: "Full" | "Bonus" | "Trailer";
  // ad_place: "video" | "middle" | "end" | "first";
  ad_period: string;
  ad_cost: string;
  publishing_date: string;
  publishing_time: string;
  description: string;
  created_at: string;
  // request_name: string;
  advertising_section: {
    id: number;
    ad_type_id: number;
    name: {
      ar: string;
      en: string;
    };
    created_at: string;
    updated_at: string;
    type: {
      id: number;
      name: {
        ar: string;
        en: string;
      };
      created_at: string;
      updated_at: string;
      is_enabled: boolean;
    };
  };
  request_id: string;
} & (
  | {
      podcaster: Podcaster;
    }
  | {
      company: Company;
    }
);

export type ContractResponse = ApiResponse & {
  contracts: Contract;
};

export type ContractsResponse = ApiResponse & {
  contracts: Contract[];
  pagination: Pagination;
};
