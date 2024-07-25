import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import { PROFILE } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

type Response = ApiResponse & {
  user: CustomUser;
};

const userEditProfile = async (body: FormData) => {
  const { data } = await axiosInstance.post<Response>(`user${PROFILE}`, body);
  return data.user;
};

export default userEditProfile;
