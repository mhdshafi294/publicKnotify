import axiosInstance from "@/lib/axios.config"; // Custom axios instance with interceptors
import { SEND_CODE } from "@/lib/apiEndPoints"; // API endpoint for sending verification code
import { forgotPasswordSchema } from "@/schema/authSchema"; // Validation schema for forgot password
import { ApiResponse } from "@/types"; // Type definition for the server response

/**
 * Function to send a verification code to the user's phone number.
 *
 * @param {Object} params - The parameters for the request.
 * @param {forgotPasswordSchema} params.body - The data for the forgot password request.
 * @param {string} params.type - The type of the request, determining the endpoint.
 *
 * @returns {Promise<ApiResponse>} - The server response.
 */
const sendCode = async ({
  body,
  type,
}: {
  body: forgotPasswordSchema;
  type: string;
}): Promise<ApiResponse> => {
  // Constructing the request payload by concatenating the country code and phone number
  const postBody = { ...body, phone: body.phone.code + body.phone.phone };

  // Sending POST request to the server to send the verification code
  const { data } = await axiosInstance.post<ApiResponse>(
    `${type}${SEND_CODE}`,
    postBody
  );

  // Returning server response
  return data;
};

export default sendCode;
