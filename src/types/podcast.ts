import { ApiResponse, Pagination } from ".";

export type Podcaster = {
  id: number;
  full_name: string;
  image: string;
};

export type Podcast = {
  id: number;
  thumbnail: string;
  name: string;
  podcaster: Podcaster;
  isFavorite: boolean;
};

export type PodcastsResponse = ApiResponse & {
  Podcasts: Podcast[];
  pagination: Pagination;
};
