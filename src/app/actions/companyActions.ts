"use server";

import getCompanies from "@/services/company/get-companies";
import getCompany from "@/services/company/get-company";

export const getCompanyAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await getCompany({
    id,
    type,
  });
};

export const getCompaniesAction = async ({
  count = "24",
  search,
  page = "1",
  type,
}: {
  count?: string;
  search?: string;
  page?: string;
  type: string;
}) => {
  return await getCompanies({
    count,
    search,
    page,
    type,
  });
};