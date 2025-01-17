// React and Third-party imports
import axios from "axios";

// Component-specific imports
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";
import { API_URL } from "./apiEndPoints";

/**
 * Create an Axios instance with a base URL and default headers.
 */
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

/**
 * Axios request interceptor to add Authorization header with the Bearer token.
 * This interceptor fetches the current session and attaches the access token
 * to the Authorization header of every request.
 */
axiosInstance.interceptors.request.use(async (config) => {
  // Get the current session
  const session = (await getServerSession(authOptions)) as CustomSession;

  // If a session exists and the user is authenticated, add the access token to the headers
  if (session?.user) {
    config.headers["Authorization"] = `Bearer ${session.user.access_token}`;
  }

  return config;
});

export const axiosPublicInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

export default axiosInstance;
