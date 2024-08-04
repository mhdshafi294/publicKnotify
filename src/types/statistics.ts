import { ApiResponse, Pagination } from ".";

export type Statistics = {
  id: number;
  revenue: number | null;
  total_revenue: number | null;
  viewsCount: number | null;
  average_listens: number | null;
  youtube_video: number | null;
  youtube_channel: number | null;
};

export type StatisticsResponse = ApiResponse & {
  statistics: Statistics;
};
