import { ApiResponse, Pagination } from ".";
import { Favourite_Category } from "./podcast";

export type Podcaster = {
  id: number;
  full_name: string;
  image: string;
  is_favorite: boolean;
  categories: Favourite_Category[];
};

export type PodcastersResponse = ApiResponse & {
  podcasters: Podcaster[];
  pagination: Pagination;
};
