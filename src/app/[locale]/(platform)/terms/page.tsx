import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

type Reposne = ApiResponse & {
  terms: {
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

const Page = async ({ params }: { params: { locale: string } }) => {
  const { data } = await axiosInstance.get<Reposne>("api/terms");
  return (
    <MaxWidthContainer className="pt-16 space-y-5">
      <h1 className="text-2xl font-bold">terms</h1>
      <article
        dangerouslySetInnerHTML={{
          __html:
            data.terms.translations.find(
              (item) => item.locale === params.locale
            )?.content || "",
        }}
        className="w-full prose max-w-full bg-secondary p-6 rounded-xl text-foreground *:text-foreground prose-p:opacity-70"
      />
    </MaxWidthContainer>
  );
};

export default Page;
