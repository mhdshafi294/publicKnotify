import { getPricingsAction } from "@/app/actions/profileActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import PricingsContainer from "./_components/pricings-container";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import PricePageHeader from "./_components/price-page-header";

const PricingsPage = async () => {
  const session = await getServerSession(authOptions);
  const data = await getPricingsAction({ type: session?.user?.type as string });
  return (
    <MaxWidthContainer className="min-h-[calc(100vh-72px)] flex justify-center items-center w-full max-w-screen-md">
      <div className="w-full">
        <PricePageHeader />
        <PricingsContainer pricings={data} />
      </div>
    </MaxWidthContainer>
  );
};

export default PricingsPage;
