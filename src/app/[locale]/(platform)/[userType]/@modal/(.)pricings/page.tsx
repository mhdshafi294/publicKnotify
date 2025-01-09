// External Imports
import { getServerSession } from "next-auth";

// Internal Imports
import { getPricingsAction } from "@/app/actions/profileActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import PricingsContainer from "../../pricings/_components/pricings-container";
import SelfPricingModal from "./modal";

const PricingPage = async () => {
  // Fetch user session
  const session = await getServerSession(authOptions);

  // Fetch pricing data based on user type
  const data = await getPricingsAction({
    type: session?.user?.type!,
  });

  return (
    <SelfPricingModal>
      <PricingsContainer pricings={data} />
    </SelfPricingModal>
  );
};

export default PricingPage;
