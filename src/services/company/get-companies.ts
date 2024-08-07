import axiosInstance from "@/lib/axios.config"; // Custom axios instance with interceptors
import { COMPANY } from "@/lib/apiEndPoints"; // API endpoint for company
import { CompaniesResponse } from "@/types/company"; // Type for Companies response

/**
 * Function to fetch companies from the server.
 *
 * @param {Object} params - The parameters for the companies request.
 * @param {string} params.count - The number of companies to fetch.
 * @param {string} [params.search] - Optional search term for filtering companies.
 * @param {string} params.page - The page number for pagination.
 * @param {string} params.type - The type of the request, determining the endpoint.
 *
 * @returns {Promise<CompaniesResponse>} - The server response data containing companies information.
 */
const getCompanies = async ({
  count,
  search,
  page,
  type,
}: {
  count: string;
  search?: string;
  page: string;
  type: string;
}): Promise<CompaniesResponse> => {
  // Sending GET request to the server to fetch companies
  const { data } = await axiosInstance.get<CompaniesResponse>(
    `/${type}${COMPANY}`,
    {
      params: {
        count,
        search,
        page,
      },
    }
  );

  // Returning server response data
  return data;
};

export default getCompanies;
