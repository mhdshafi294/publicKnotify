import { ApiResponse, Pagination } from ".";

export type PodcastDetails = {
  id: number;
  background: string;
  created_at: string;
  name: string;
  podcast: string;
  summary: string;
  thumbnail: string;
  type: "audio" | "video";
  categories: CategoryDetails[];
  podcaster: PodcastPodcaster;
  hashTags: HashTag[];
  playback_position: PlaybackPosition;
};

export type SelfPodcastDetails = {
  id: number;
  background: string;
  // created_at: string;
  is_published: boolean;
  name: string;
  podcast: string;
  summary: string;
  thumbnail: string;
  type: "audio" | "video";
  categories: CategoryDetails[];
  podcaster: PodcastPodcaster;
  hashTags: HashTag[];
  publishing_date: string;
  publishing_time: string;
  company_tag: string;
  request_id: string;
};

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

export type CategoryDetails = {
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
  favourite_categories: Category[];
  playback_position: PlaybackPosition | null;
  belongs_to_playlist: 1 | 0;
};

export type Category = {
  id: number;
  name: string;
  created_at: string;
};

export type PlaybackPosition = {
  id: number;
  current_position: number;
  total_time: number;
};

export type Playlist = {
  id: number;
  name: string;
  description: string;
  image: string;
  podcasts_count: number;
  created_at: string;
};

export type MetadataResponse = ApiResponse & {
  podcast_id: string;
};

export type PodcastResponse = ApiResponse & {
  podcast: PodcastDetails;
};

export type PodcastsResponse = ApiResponse & {
  podcasts: Podcast[];
  pagination: Pagination;
};
export type SelfPodcastDetailsResponse = ApiResponse & {
  podcast: SelfPodcastDetails;
};
export type SelfPodcastsDetailsResponse = ApiResponse & {
  podcasts: SelfPodcastDetails[];
  pagination: Pagination;
};

export type CategoryResponse = ApiResponse & {
  categories: CategoryDetails[];
};

export type PlaylistResponse = ApiResponse & {
  playlist: Playlist;
};
export type PlaylistsResponse = ApiResponse & {
  playlists: Playlist[];
  pagination: Pagination;
};
