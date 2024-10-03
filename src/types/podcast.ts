import { ApiResponse, Pagination, TranslationsType } from ".";
import { Podcaster, PodcasterDetails } from "./podcaster";

export type PodcastDetails = {
  id: number;
  type: "audio" | "video";
  name: string;
  summary: string;
  categories: Category[];
  hashTags: HashTag[];
  thumbnail: string;
  background: string;
  podcast: string;
  podcaster: { full_name: string; id: number };
  playback_position: {
    id: number;
    current_position: number;
    total_time: number;
  } | null;
  created_at: string;
  playlist: Playlist | null;
};

export type SelfPodcastDetails = {
  id: number;
  type: "audio" | "video";
  name: string;
  summary: string;
  is_published: boolean;
  publishing_date: string;
  publishing_time: string;
  company_tag: string | null;
  categories: CategoryDetails[];
  hashTags: HashTag[];
  thumbnail: string;
  youtube_thumbnail: string;
  background: string;
  podcast: string;
  playlist_id: number;
  order: number;
  episode_type: number | null;
  episode_type_translation: string | null;
  note: string | null;
  footer: string | null;
  contributors: string[] | boolean;
  tags: string[] | boolean;
  recast_color_border: string | null;
  alternate_episode_url: string | null;
  explicit_language: number;
  // created_at: string;
  // podcaster: PodcastPodcaster;
  // request_id: string;
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
  parent_id: number | null;
  translations: TranslationsType[];
  created_at: string;
  updated_at: string;
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
  footer: string | null;
  image: string;
  podcasts_count: number;
  type: number | null;
  type_translation: string | null;
  authors: string[];
  tags: string[];
  show_owner: string | null;
  owner_email: string | null;
  copyright: string | null;
  categories: Category[];
  created_at: string;
  podcasts: SelfPodcastDetails[];
};

export type DistributionLinks = {
  id: number;
  playlist_id: number;
  redirect_url: string;
  type: string;
  url: string;
};

export type SearchResponse = ApiResponse & {
  search: {
    podcasters: {
      data: Podcaster[];
      pagination: Pagination;
    };
    podcasts: { data: Podcast[]; pagination: Pagination };
    playLists: { data: Playlist[]; pagination: Pagination };
  };
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

export type CollectionsResponse = ApiResponse & {
  collection: Podcast[];
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

export type RssResponse = ApiResponse & {
  rss: string;
};

export type DistreputionsResponse = ApiResponse & {
  links: DistributionLinks[];
};
