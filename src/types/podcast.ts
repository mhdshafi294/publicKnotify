import { ApiResponse, Pagination } from ".";

export type PodcastPodcaster = {
  id: number;
  full_name: string;
  image: string;
  spotify_account: string | null;
  youtube_account: string | null;
};

export type HashTag = {
  id: number;
  name: string;
  podcast_id: number;
};

export type Category = {
  id: number;
  name: string;
  created_at: string;
  podcasts_count: number;
  image: string;
};

export type Podcast = {
  id: number;
  thumbnail: string;
  name: string;
  podcaster: PodcastPodcaster;
  type: "video" | "audio";
  is_favorite: boolean;
};

export type PodcastsResponse = ApiResponse & {
  podcasts: Podcast[];
  pagination: Pagination;
};

export type CategoryResponse = ApiResponse & {
  categories: Category[];
};

export type PodcastDetails = {
  id: number;
  background: string;
  created_at: string;
  name: string;
  podcast: string;
  summary: string;
  thumbnail: string;
  type: "audio" | "video";
  categories: Category[];
  podcaster: PodcastPodcaster;
  hashTags: HashTag[];
};
