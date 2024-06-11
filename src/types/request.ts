import { ApiResponse, Pagination } from ".";

export type Request = {
  id: number;
  name: string;
  summary: string;
  status: string;
  ad_cost: string;
  ad_place: string;
  publishing_date: string;
  company: company;
  created_at: string;
};

export type company = {
  id: number;
  full_name: string;
};

export type RequestResponse = ApiResponse & {
  request: Request;
};

export type RequestsResponse = ApiResponse & {
  requests: Request[];
  pagination: Pagination;
};
