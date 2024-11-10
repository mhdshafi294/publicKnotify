import { create } from "zustand";
import { ApiResponse } from ".";

export type Plan = {
  id: number;
  months: string;
  monthly_price: string;
  annual_price: string;
  is_active: boolean;
  name: string;
  description: string;
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
