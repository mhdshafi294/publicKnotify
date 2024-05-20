import axiosInstance from "@/lib/axios.config";
import { REGISTER_URL } from "@/lib/apiEndPoints";
import { signUpSchema } from "@/schema/authSchema";
import country from "country-list-js";

const signUp = async (body: signUpSchema, type: string) => {
  const formData = new FormData();
  const countriesCode = (
    Object.values(country.all) as {
      name: string;
      dialing_code: string;
      iso2: string;
    }[]
  ).find((country) => country.dialing_code === body.phone.code)?.iso2;

  formData.append("full_name", body.full_name);
  formData.append("phone", `${body.phone.code}${body.phone.phone}`);
  formData.append("iso_code", countriesCode!);
  formData.append("password", body.password);
  formData.append("password_confirmation", body.password_confirmation);
  if (type === "company" && body.documents)
    formData.append("document", body.documents);

  const { data } = await axiosInstance.post(`${type}${REGISTER_URL}`, formData);
  return data.data;
};

export default signUp;
