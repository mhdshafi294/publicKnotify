export type Pagination = {
  current_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: null;
  total: number;
};
export type ApiResponse = {
  message: string;
  success: boolean;
};

export type ApiResponseWithPagination = ApiResponse & {
  pagination: Pagination;
};

export type TranslationsType = {
  id: number;
  [key: string]: string | number;
  locale: string;
  name: string;
};
