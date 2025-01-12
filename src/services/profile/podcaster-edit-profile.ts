import { CustomUser } from "@/app/api/auth/[...nextauth]/auth-options";
import { PROFILE } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";
import { revalidatePath } from "next/cache";

type Response = ApiResponse & {
  user: CustomUser;
};

const podcasterEditProfile = async (body: FormData) => {
  const { data } = await axiosInstance.post<Response>(
    `podcaster${PROFILE}`,
    body
  );
  revalidatePath("/[locale]/podcaster/profile/edit");
  return data.user;
};

export default podcasterEditProfile;
