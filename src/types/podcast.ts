import { ApiResponse, Pagination } from ".";

export type PodcastPodcaster = {
  id: number;
  full_name: string;
  image: string;
};

export type Category = {
  id: number;
  name: string;
  created_at: string;
};

export type Podcast = {
  id: number;
  thumbnail: string;
  name: string;
  podcaster: PodcastPodcaster;
  isFavorite: boolean;
};

export type PodcastsResponse = ApiResponse & {
  podcasts: Podcast[];
  pagination: Pagination;
};

export type CategoryResponse = ApiResponse & {
  categories: Category[];
};
