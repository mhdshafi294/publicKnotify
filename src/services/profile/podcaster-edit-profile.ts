import { PROFILE } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";

const podcasterEditProfile = async (body: FormData) => {
  await axiosInstance.post(`podcaster${PROFILE}`, body);
};

export default podcasterEditProfile;
