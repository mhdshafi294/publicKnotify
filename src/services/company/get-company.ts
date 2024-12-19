import { COMPANY, DETAILS } from "@/lib/apiEndPoints"; // API endpoints for company details
import axiosInstance from "@/lib/axios.config"; // Custom axios instance with interceptors
import { CompanyResponse } from "@/types/company"; // Type for Company response

/**
 * Function to fetch details of a specific company from the server.
 *
 * @param {Object} params - The parameters for the company request.
 * @param {string} params?.id - The ID of the company to fetch details for.
 * @param {string} params.type - The type of the request, determining the endpoint.
 *
 * @returns {Promise<CompanyResponse>} - The server response data containing company details.
 */
const getCompany = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}): Promise<CompanyResponse> => {
  // Sending GET request to the server to fetch company details
  const { data } = await axiosInstance.get<CompanyResponse>(
    `/${type}${COMPANY}${DETAILS}/${id}`
  );

  // Returning server response data
  return data;
};

export default getCompany;
