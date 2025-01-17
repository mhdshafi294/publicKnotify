// External imports
import axiosInstance from "@/lib/axios.config";
import { getTranslations } from "next-intl/server";

// Local imports
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { ApiResponse } from "@/types";

// Type definitions
type PolicyResponse = ApiResponse & {
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

/**
 * PrivacyPage Component
 * Fetches and displays the privacy policy content based on the locale.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.locale - The locale for the content.
 *
 * @returns {JSX.Element} The privacy policy page with localized content.
 */
const PrivacyPage = async ({ params }: { params: { locale: string } }) => {
  // Fetch policy data
  const { data } = await axiosInstance.get<PolicyResponse>("api/policy");

  // Fetch translations
  const t = await getTranslations("Index");

  return (
    <MaxWidthContainer className="pt-16 flex-1 space-y-5">
      <h1 className="text-2xl font-bold">{t("privacyPolicy")}</h1>
      {data.policy.translations ? (
        <article
          dangerouslySetInnerHTML={{
            __html:
              data.policy.translations.find(
                (item) => item.locale === params.locale
              )?.content || "",
          }}
          className="w-full prose max-w-full bg-secondary p-6 rounded-xl !text-foreground *:text-foreground"
        />
      ) : (
        <div>
          <p className="italic font-semibold text-lg">
            {t("no_policy_available")}
          </p>
        </div>
      )}
    </MaxWidthContainer>
  );
};

export default PrivacyPage;
