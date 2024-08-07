"use server";

import getCompanies from "@/services/company/get-companies"; // Service to get a list of companies
import getCompany from "@/services/company/get-company"; // Service to get details of a specific company

/**
 * Action to get details of a specific company.
 *
 * @param {Object} params - The parameters for getting the company details.
 * @param {string} params.id - The ID of the company.
 * @param {string} params.type - The type of the request.
 * @returns {Promise<any>} - The response from the getCompany service.
 */
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

/**
 * Action to get a list of companies.
 *
 * @param {Object} params - The parameters for getting the list of companies.
 * @param {string} [params.count="24"] - The number of companies to fetch.
 * @param {string} [params.search] - The search query to filter companies.
 * @param {string} [params.page="1"] - The page number for pagination.
 * @param {string} params.type - The type of the request.
 * @returns {Promise<any>} - The response from the getCompanies service.
 */
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
