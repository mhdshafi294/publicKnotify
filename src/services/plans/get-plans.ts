import axiosInstance from "@/lib/axios.config";
import { PLANS } from "@/lib/apiEndPoints";
import { PlansResponse } from "@/types/plan";

const getPalns = async ({
  type,
  playlist_id,
  lang,
}: {
  type: string;
  playlist_id: string;
  lang: string;
}) => {
  const { data } = await axiosInstance.get<PlansResponse>(`/${type}${PLANS}`, {
    headers: { lang },
    params: { playlist_id },
  });
  return data;
};

export default getPalns;
