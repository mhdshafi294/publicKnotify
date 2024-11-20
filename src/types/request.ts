import { ApiResponse, ApiResponseWithPagination, Pagination } from ".";
import { Company } from "./company";
import { CategoryDetails } from "./podcast";
import { Podcaster } from "./podcaster";

// export type Request = {
//   id: number;
//   name: string;
//   summary: string;
//   status: string;
//   ad_cost: string;
//   ad_place: string;
//   publishing_date: string;
//   company?: Company;
//   podcaster?: Podcaster;
//   created_at: string;
// };

export type Request = {
  id: number;
  status: string;
  status_id: number;
  type: string;
  advertising_section: {
    id: number;
    ad_type_id: number;
    name: {
      ar: string;
      en: string;
    };
    type: {
      id: number;
      name: {
        ar: string;
        en: string;
      };
    };
  };
  created_at: string;
} & (
  | {
      podcaster: {
        id: number;
        full_name: string;
        image: string;
      };
    }
  | {
      company: {
        id: number;
        full_name: string;
        image: string;
      };
    }
);

export type RequestDetails = {
  id: number;
  name: string;
  status: string;
  type: "audio" | "video";
  ad_cost: string;
  publishing_date: string;
  publishing_time: string;
  ad_period: string;
  ad_place: string;
  company_tag: string;
  summary: string;
  categories: CategoryDetails[];
  company?: Company;
  podcaster?: Podcaster;
  hashTags: RequestHashTags[];
  thumbnail: string;
  background: string;
  // created_at: string;
};

// export type RequestCompany = {
//   id: number;
//   full_name: string;
//   phone: string,
//   iso_code: string,
//   email: string,
//   image: string,
//   is_favorite: boolean,
//   favourite_categories: string[]
// };
// export type RequestPodcaster = {
//   id: number;
//   full_name: string;
// };

// export type RequestCategories = {
//   id: number;
//   name: string;
//   podcasts_count: number | null;
//   image: string;
//   created_at: string;
// };

export type AdTypes = {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  sections: {
    id: number;
    ad_type_id: number;
    name: {
      ar: string;
      en: string;
    };
  }[];
};

export type RequestHashTags = {
  id: number;
  name: string;
};

export type RequestResponse = ApiResponse & {
  request: RequestDetails;
};

export type RequestsResponse = ApiResponseWithPagination & {
  requests: Request[];
};

export type AdTypesResponse = ApiResponse & {
  types: AdTypes[];
};
