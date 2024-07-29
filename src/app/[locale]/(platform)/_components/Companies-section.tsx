import { getCompaniesAction } from "@/app/actions/companyActions";
import InfiniteScrollCompanies from "@/components/infinite-scroll-companies";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";

const CompaniesSection = async () => {
  const data = await getCompaniesAction({
    count: "10",
    page: "1",
    type: "podcaster",
  });

  return (
    <MaxWidthContainer className="space-y-4">
      <h2 className="px-3 font-bold text-3xl capitalize">trending Companies</h2>
      <InfiniteScrollCompanies initialData={data.companies} />
    </MaxWidthContainer>
  );
};

export default CompaniesSection;
