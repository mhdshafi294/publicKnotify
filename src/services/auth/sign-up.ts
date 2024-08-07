import axiosInstance from "@/lib/axios.config"; // Custom axios instance with interceptors
import { REGISTER_URL } from "@/lib/apiEndPoints"; // API endpoint for user registration
import { signUpSchema } from "@/schema/authSchema"; // Validation schema for sign-up
import { ApiResponse } from "@/types"; // Type for API response

/**
 * Function to handle user sign-up.
 *
 * @param {Object} params - The parameters for the sign-up request.
 * @param {FormData} params.formData - The form data for registration.
 * @param {string} params.type - The type of the request, determining the endpoint.
 *
 * @returns {Promise<ApiResponse>} - The server response data.
 */
const signUp = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}): Promise<ApiResponse> => {
  // Sending POST request to the server for user registration
  const { data } = await axiosInstance.post<ApiResponse>(
    `${type}${REGISTER_URL}`,
    formData
  );

  // Returning server response data
  return data;
};

export default signUp;
