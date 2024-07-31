import { PRICE } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { EditPricingSchema } from "@/schema/pricingsSchema";
import { revalidatePath } from "next/cache";

const createOrUpdatePrice = async ({
  body,
}: {
  body: EditPricingSchema;
}) => {
  await axiosInstance.post(`/podcaster${PRICE}`, body);
  revalidatePath('/[locale]/[userType]/pricings')
};

export default createOrUpdatePrice;
