import { ApiResponse, Pagination } from ".";
import { Category } from "./podcast";

export type Company = {
  id: number;
  full_name: string;
  phone: string;
  iso_code: string;
  email: string;
  image: string;
  is_favorite: boolean | null;
  favourite_categories: Category[];
};

export type CompanyResponse = ApiResponse & {
  company: Company;
};
export type CompaniesResponse = ApiResponse & {
  companies: Company[];
  pagination: Pagination;
};
