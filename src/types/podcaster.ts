import { ApiResponse, Pagination } from ".";

export type Podcaster = {
  id: number;
  full_name: string;
  image: string;
  is_favorite: boolean;
};

export type PodcastersResponse = ApiResponse & {
  podcasters: Podcaster[];
  pagination: Pagination;
};
