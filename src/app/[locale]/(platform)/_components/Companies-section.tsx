import { getCompaniesAction } from "@/app/actions/companyActions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import InfiniteScrollCompanies from "./infinite-scroll-companies";

const CompaniesSection = async () => {
  const data = await getCompaniesAction({
    count: "10",
    page: "1",
    type: "podcaster",
  });

  return (
    <MaxWidthContainer className="space-y-4">
      <h2 className="px-3 font-bold text-3xl capitalize">trending Companies</h2>
      <InfiniteScrollCompanies initialRequests={data.companies} />
    </MaxWidthContainer>
  );
};

export default CompaniesSection;
