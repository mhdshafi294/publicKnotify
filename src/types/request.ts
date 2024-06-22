import { ApiResponse, Pagination } from ".";

export type Request = {
  id: number;
  name: string;
  summary: string;
  status: string;
  ad_cost: string;
  ad_place: string;
  publishing_date: string;
  company: RequestCompany;
  created_at: string;
};

export type RequestDetails = {
  id: number;
  name: string;
  status: string;
  type: string;
  ad_cost: string;
  publishing_date: string;
  publishing_time: string;
  ad_period: string;
  ad_place: string;
  company_tag: string;
  summary: string;
  categories: RequestCategories[];
  company: RequestCompany;
  hashTags: RequestHashTags[];
  thumbnail: string;
  background: string;
  // created_at: string;
};

export type RequestCompany = {
  id: number;
  full_name: string;
};

export type RequestCategories = {
  id: number;
  name: string;
  podcasts_count: number | null;
  image: string;
  created_at: string;
};

export type RequestHashTags = {
  id: number;
  name: string;
};

export type RequestResponse = ApiResponse & {
  request: RequestDetails;
};

export type RequestsResponse = ApiResponse & {
  requests: Request[];
  pagination: Pagination;
};
