import { ApiResponse, Pagination } from ".";
import { Category } from "./podcast";

export type Company = {
  id: number;
  full_name: string;
  phone: string;
  iso_code: string;
  email: string;
  image: string;
  is_favorite: boolean;
  favourite_categories: Category[];
};

export type PodcastersResponse = ApiResponse & {
  podcasters: Company[];
  pagination: Pagination;
};
