import { ApiResponse } from ".";
import { Category } from "./podcast";

export type User = {
  id: number;
  full_name: string;
  phone: string;
  iso_code: string;
  email: string | null;
  image: string;
  documents?: string;
  is_enabled_price?: boolean;
  price?: Price;
  youtube_account?: string | null;
  spotify_account?: string | null;
  enable_notification: 1 | 0 | null;
  categories: Category[];
  type: string;
  created_at: string;
};

export type Price = {
  id: number;
  video: string;
  first: string;
  middle: string;
  end: string;
  created_at: string;
  is_enabled: boolean;
};

export type PriceApiResponse = ApiResponse & { price: Price | null };

export type ProfileResponse = {
  user: User;
} & ApiResponse;
