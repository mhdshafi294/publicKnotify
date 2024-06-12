import { ApiResponse, Pagination } from ".";
import { Category } from "./podcast";

export type Podcaster = {
  id: number;
  full_name: string;
  image: string;
  is_favorite: boolean;
  categories: Category[];
  favourite_categories: Category[];
};

export type PodcastersResponse = ApiResponse & {
  podcasters: Podcaster[];
  pagination: Pagination;
};
