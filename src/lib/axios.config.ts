import axios from "axios";
import { API_URL } from "./apiEndPoints";
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = (await getServerSession(authOptions)) as CustomSession;
  if (session?.user) {
    config.headers["Authorization"] = `Bearer ${session.user.access_token}`;
  }
  return config;
});

export default axiosInstance;
