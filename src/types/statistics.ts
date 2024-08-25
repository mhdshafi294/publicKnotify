import { ApiResponse, Pagination } from ".";

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

export type StatisticsResponse = ApiResponse & {
  statistics: Statistics;
};
