import { ApiResponse, ApiResponseWithPagination } from ".";

export type Stories = {
  id: number;
  description: string;
  type: string;
  color: string;
  video: string;
  image: string;
  thumbnail: string;
  is_viewd: boolean;
};

export type SelfStories = {
  id: number;
  description: string;
  type: string;
  color: string;
  video: string;
  image: string;
  thumbnail: string;
  viewers_count: number;
  viewers: {
    id: number;
    name: string;
    type: string;
    image: string;
  }[];
  created_at: string;
};

export type StoriesResponse = ApiResponseWithPagination & {
  stories: {
    podcaster: {
      id: number;
      name: string;
      image: string;
    };
    stories: Stories;
  };
};

export type SelfStoriesResponse = ApiResponse & {
  stories: SelfStories[];
};
