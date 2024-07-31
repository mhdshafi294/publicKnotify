import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";
import SupportForm from "./_components/support-form";

type Reposne = ApiResponse & {
  policy: {
    id: number;
    content: string;
    translations: {
      id: number;
      term_policy_id: number;
      locale: "ar" | "en";
      content: string;
    }[];
  };
};

const Page = async () => {
  return (
    <MaxWidthContainer className="pt-16 space-y-5">
      <SupportForm />
    </MaxWidthContainer>
  );
};

export default Page;
