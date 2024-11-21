import { create } from "zustand";
import { ApiResponse } from ".";

export type Plan = {
  id: number;
  best_deal: boolean;
  monthly_price: string;
  annual_price: string;
  is_active: boolean;
  name: string;
  description: string;
  features: string[];
  created_at: string;
  price: number;
  translations: {
    id: number;
    plan_id: number;
    locale: string;
    name: string;
    description: string;
  }[];
};

export type PlansResponse = ApiResponse & {
  plans: Plan[];
};

export type PayPlanResponse = ApiResponse & {
  url: string;
};
