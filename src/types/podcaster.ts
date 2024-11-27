import { ApiResponse, Pagination } from ".";
import { Category } from "./podcast";
import { Price } from "./profile";
import { YoutubeChannel } from "./statistics";
import { Story } from "./stories";

export type Podcaster = {
  id: number;
  full_name: string;
  image: string;
  is_favorite: boolean;
  categories: Category[];
  favourite_categories: Category[];
  stories: string[];
  total_time: number;
  total_likes: number;
  podcasts_count: number;
};

export type PodcasterDetails = {
  id: number;
  full_name: string;
  image: string;
  is_favorite: boolean;
  youtube_account: string;
  spotify_account: string;
  phone: string;
  email: string;
  price: Price[];
  categories: Category[];
  favourite_categories: Category[];
  statistics?: Statistics;
  stories: Story[];
  monthly_listeners: number;
};

export type Statistics = {
  podcsats_count: number;
  average_listeners: string;
  youtube: YoutubeChannel;
};

export type PodcasterResponse = ApiResponse & {
  podcaster: PodcasterDetails;
};
export type PodcastersResponse = ApiResponse & {
  podcasters: Podcaster[];
  pagination: Pagination;
};
