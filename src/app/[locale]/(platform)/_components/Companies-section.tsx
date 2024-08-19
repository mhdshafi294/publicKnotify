import { getCompaniesAction } from "@/app/actions/companyActions";
import InfiniteScrollCompanies from "@/components/infinite-scroll-companies";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { getTranslations } from "next-intl/server";

const CompaniesSection = async () => {
  const data = await getCompaniesAction({
    count: "10",
    page: "1",
    type: "podcaster",
  });

  const t = await getTranslations("Index");

  return (
    <MaxWidthContainer className="space-y-4 flex-1 h-full">
      <h2 className="px-3 font-bold text-3xl capitalize">
        {t("trendingCompanies")}
      </h2>
      <InfiniteScrollCompanies initialData={data.companies} />
    </MaxWidthContainer>
  );
};

export default CompaniesSection;
