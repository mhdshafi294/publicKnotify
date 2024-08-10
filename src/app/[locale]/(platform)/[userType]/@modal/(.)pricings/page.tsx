// External Imports
import { getServerSession } from "next-auth";

// Internal Imports
import { getPricingsAction } from "@/app/actions/profileActions";
import PricingsContainer from "../../pricings/_components/pricings-container";
import Modal from "./modal";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const PricingPage = async () => {
  // Fetch user session
  const session = await getServerSession(authOptions);

  // Fetch pricing data based on user type
  const data = await getPricingsAction({
    type: session?.user?.type ?? "default", // Handle cases where user type might be undefined
  });

  return (
    <Modal>
      <PricingsContainer pricings={data} />
    </Modal>
  );
};

export default PricingPage;
