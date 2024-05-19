import axios from "axios";
import { API_URL } from "./apiEndPoints";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;
