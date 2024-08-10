// External imports
import { getServerSession } from "next-auth";

// Local imports
import { getPricingsAction } from "@/app/actions/profileActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import PricingsContainer from "./_components/pricings-container";
import PricePageHeader from "./_components/price-page-header";

/**
 * PricingsPage Component
 * Fetches pricing data based on the user's session and renders the pricings page.
 *
 * @returns {JSX.Element} The pricings page with header and pricing details.
 */
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
