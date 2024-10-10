import { ApiResponse } from ".";

export type Statistics = {
  id: number;
  revenue: number | null;
  total_revenue: number | null;
  viewsCount: number | null;
  average_listens: number | null;
  youtube_video: string | null;
  youtube_channel: YoutubeChannel | null;
};

export type ShowStatistics = {
  playlist_statistics: PlaylistStatistics;
  five_latest_episodes: EpisodesStatistics[];
  top_episodes: {
    id: number;
    name: string;
    views_count: number;
  }[];
  youtube_channel?: YoutubeChannel | null;
  enabled: EnabledStatistics;
};

export type ShowViewsStatistics = {
  views_over_time: {
    date: string;
    views_count: number;
  }[];
};

export type ShowMostPopularStatistics = {
  most_popular_time: number | null;
  most_popular_day: string | null;
  top_country: {
    country: string;
    count: number;
  } | null;
  all_time_views: number;
};

export type ShowTimeStatistics = {
  times: {
    hour: number;
    count: number;
  }[];
};

export type PlatformCounter = {
  platform: string;
  count: number;
};

export type ShowPlatformStatistics = {
  top_platforms: PlatformCounter[];
  downloads_by_platform: PlatformCounter[];
  total_count: number;
};

export type CountryCounter = {
  country: string;
  count: number;
};

export type ShowCountryStatistics = {
  top_countries: CountryCounter[];
  downloads_by_location: CountryCounter[];
  total_count: number;
};

export type PlaylistStatistics = {
  total_views: number;
  last_7_days_views: number;
  previous_7_days_views: number;
  today_views: number;
  unique_listeners_last_7_days: number;
};

export type EpisodesStatistics = {
  podcast: {
    id: number;
    name: string;
    publishing_date: string;
  };
  total_views: number;
  daily_views: {
    [key: string]: number;
  };
  days_since_release: number;
};

export type YoutubeChannel = {
  viewCount: number;
  subscriberCount: number;
  hiddenSubscriberCount: boolean;
  videoCount: number;
};

export type EnabledStatistics = {
  id: number;
  podcaster_id: number;
  playlist_statistics: boolean;
  top_episodes: boolean;
  youtube_channel: boolean;
  most_popular: boolean;
  created_at: string;
  updated_at: string;
};

export type StatisticsResponse = ApiResponse & {
  statistics: Statistics;
};

export type ShowStatisticsResponse = ApiResponse & {
  statistics: ShowStatistics;
};

export type ShowViewsStatisticsResponse = ApiResponse & {
  statistics: ShowViewsStatistics;
};

export type ShowMostPopularStatisticsResponse = ApiResponse & {
  statistics: ShowMostPopularStatistics;
};

export type ShowTimeStatisticsResponse = ApiResponse & {
  statistics: ShowTimeStatistics;
};

export type ShowPlatformStatisticsResponse = ApiResponse & {
  statistics: ShowPlatformStatistics;
};

export type ShowCountryStatisticsResponse = ApiResponse & {
  statistics: ShowCountryStatistics;
};
