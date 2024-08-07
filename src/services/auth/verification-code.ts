import axiosInstance from "@/lib/axios.config"; // Custom axios instance with interceptors
import { VERIFICATION_CODE } from "@/lib/apiEndPoints"; // API endpoint for verification code
import { ApiResponse } from "@/types"; // Type for API response

/**
 * Function to confirm the verification code.
 *
 * @param {Object} params - The parameters for the verification code request.
 * @param {string} params.code - The verification code.
 * @param {string} params.phone - The phone number to be verified.
 * @param {string} params.type - The type of the request, determining the endpoint.
 *
 * @returns {Promise<ApiResponse>} - The server response data.
 */
const confirmVerificationCode = async ({
  code,
  phone,
  type,
}: {
  code: string;
  phone: string;
  type: string;
}): Promise<ApiResponse> => {
  // Request body containing the phone and verification code
  const body = { phone, code };

  // Sending POST request to the server to confirm the verification code
  const { data } = await axiosInstance.post<ApiResponse>(
    `${type}${VERIFICATION_CODE}`,
    body
  );

  // Returning server response data
  return data;
};

export default confirmVerificationCode;
