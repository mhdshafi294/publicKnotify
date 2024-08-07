import axiosInstance from "@/lib/axios.config"; // Custom axios instance with interceptors
import { EDIT_PASSWORD } from "@/lib/apiEndPoints"; // API endpoint for editing password
import { newPasswordSchema } from "@/schema/authSchema"; // Validation schema for new password
import { ApiResponse } from "@/types"; // Type definition for the server response

/**
 * Function to set a new password by sending the new password data to the server.
 *
 * @param {Object} params - The parameters for the request.
 * @param {newPasswordSchema} params.newPasswordData - The new password data.
 * @param {string} params.phone - The phone number associated with the request.
 * @param {string} params.code - The verification code.
 * @param {string} params.type - The type of the request, determining the endpoint.
 *
 * @returns {Promise<ApiResponse>} - The server response.
 */
const newPassword = async ({
  newPasswordData,
  phone,
  code,
  type,
}: {
  newPasswordData: newPasswordSchema;
  phone: string;
  code: string;
  type: string;
}): Promise<ApiResponse> => {
  // Constructing the request payload
  const body = {
    phone,
    code,
    ...newPasswordData,
  };

  // Sending POST request to the server to set the new password
  const { data } = await axiosInstance.post<ApiResponse>(
    `${type}${EDIT_PASSWORD}`,
    body
  );

  // Returning server response
  return data;
};

export default newPassword;
