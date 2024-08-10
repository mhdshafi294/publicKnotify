// Global imports
import { getTranslations } from "next-intl/server";

// Local imports
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import axiosInstance from "@/lib/axios.config";
import { ApiResponse } from "@/types";

// Define the response structure for the API
type TermsResponse = ApiResponse & {
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

/**
 * TermsPage Component
 * Fetches and displays the terms and conditions content based on the user's locale.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.params - The parameters from the URL.
 * @param {string} props.params.locale - The locale used to determine which translation to show.
 *
 * @returns {JSX.Element} The terms and conditions page content.
 */
const TermsPage = async ({ params }: { params: { locale: string } }) => {
  // Fetch terms and conditions data from the API
  const { data } = await axiosInstance.get<TermsResponse>("api/terms");

  // Fetch translations for the "Index" namespace
  const t = await getTranslations("Index");

  return (
    <MaxWidthContainer className="pt-16 space-y-5">
      {/* Page title */}
      <h1 className="text-2xl font-bold">{t("terms")}</h1>

      {/* Terms and conditions content */}
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

export default TermsPage;
