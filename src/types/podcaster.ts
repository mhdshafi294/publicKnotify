import { ApiResponse, Pagination } from ".";
import { Category } from "./podcast";
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
};

export type Price = {
  id: number;
  video: string;
  first: string;
  middle: string;
  end: string;
  created_at: string;
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
  price: Price;
  categories: Category[];
  favourite_categories: Category[];
  statistics?: Statistics;
  stories: Story[];
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
