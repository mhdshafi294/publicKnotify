import { PRICE } from "@/lib/apiEndPoints";
import axiosInstance from "@/lib/axios.config";
import { Price } from "@/types/profile";
import { revalidatePath } from "next/cache";

const createOrUpdatePrice = async ({
  body,
}: {
  body: { data: { price: number; advertising_section_id: number }[] };
}) => {
  await axiosInstance.post(`/podcaster${PRICE}`, body);
  revalidatePath("/[locale]/[userType]/pricings");
};

export default createOrUpdatePrice;
