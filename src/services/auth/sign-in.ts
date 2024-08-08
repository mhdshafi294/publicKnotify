import axiosInstance from "@/lib/axios.config"; // Custom axios instance with interceptors
import { LOGIN_URL } from "@/lib/apiEndPoints"; // API endpoint for user login
import { loginSchema } from "@/schema/authSchema"; // Validation schema for login

/**
 * Function to handle user sign-in.
 *
 * @param {loginSchema} body - The login data.
 * @param {string} type - The type of the request, determining the endpoint.
 *
 * @returns {Promise<any>} - The server response data.
 */
const signIn = async (body: loginSchema, type: string): Promise<any> => {
  // Constructing the request payload by concatenating the country code and phone number
  const postBody = { ...body, phone: `${body.phone.code}${body.phone.phone}` };

  // Sending POST request to the server for user login
  const { data } = await axiosInstance.post(`${type}${LOGIN_URL}`, postBody);

  // Returning server response data
  return data.data;
};

export default signIn;
