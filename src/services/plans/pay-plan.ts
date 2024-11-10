import axiosInstance from "@/lib/axios.config";
import { PLANS } from "@/lib/apiEndPoints";
import { PayPlanResponse } from "@/types/plan";

const payPlan = async ({
  annual,
  playlist_id,
  plan_id,
  type,
}: {
  annual?: string;
  playlist_id: string;
  plan_id: string;
  type: string;
}) => {
  const { data } = await axiosInstance.get<PayPlanResponse>(
    `/${type}${PLANS}/${plan_id}/${playlist_id}`,
    {
      params: {
        annual,
      },
    }
  );
  return data.url;
};

export default payPlan;
