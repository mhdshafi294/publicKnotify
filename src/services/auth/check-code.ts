import axiosInstance from "@/lib/axios.config"; // Custom axios instance with interceptors
import { CHECK_CODE } from "@/lib/apiEndPoints"; // API endpoints
import { ApiResponse } from "@/types"; // Type definitions

/**
 * Function to confirm a code by sending it to the server.
 *
 * @param {Object} params - The parameters for the request.
 * @param {string} params.code - The confirmation code to check.
 * @param {string} params.phone - The phone number associated with the code.
 * @param {string} params.type - The type of the request, determining the endpoint.
 *
 * @returns {Promise<ApiResponse>} - The server response.
 */
const confirmCheckCode = async ({
  code,
  phone,
  type,
}: {
  code: string;
  phone: string;
  type: string;
}): Promise<ApiResponse> => {
  const body = { phone, code }; // Request payload
  const { data } = await axiosInstance.post<ApiResponse>(
    `${type}${CHECK_CODE}`,
    body
  ); // Sending POST request to the server
  return data; // Returning server response
};

export default confirmCheckCode;
